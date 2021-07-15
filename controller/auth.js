import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function signup(req, res) {
  const { email, password, name, url } = req.body;
  const found = await userRepository.findByEmail(email);
  if (found) {
    return res.status(409).json({ message: `${email} already exists` });
  }

  const role = 0;
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    email,
    password: hashed,
    name,
    role,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, name, role });
}

export async function signin(req, res) {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, name: user.name, role: user.role });
}

export async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, name: user.name, role: user.role });
}
