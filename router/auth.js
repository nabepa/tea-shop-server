import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', authController.signup);

export default router;
