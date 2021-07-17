import express from 'express';
import 'express-async-errors';
import { isAuth } from '../middleware/auth.js';
import * as cartController from '../controller/cart.js';

// Todo: Validator for cart

const router = express.Router();

router.get('/:id', isAuth, cartController.getCartItems);
router.get('/:id/:productId', isAuth, cartController.getCartItem);
router.post('/:id/:productId', isAuth, cartController.createCartItem);

export default router;
