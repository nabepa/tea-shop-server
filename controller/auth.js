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
  const { username, password, name, email, url } = req.body;
  const foundById = await userRepository.findByUsername(username);
  if (foundById) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const foundByEmail = await userRepository.findByEmail(email);
  if (foundByEmail) {
    return res.status(409).json({ message: `${email} already exists` });
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    admin: false,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function signin(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

export async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
