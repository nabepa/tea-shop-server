import express from 'express';
import 'express-async-errors';
import { isAuth } from '../middleware/auth.js';
import * as cartController from '../controller/cart.js';

// Todo: Validator for cart

const router = express.Router();

router.get('/', isAuth, cartController.getCartsOfUser);
router.get('/:id', isAuth, cartController.getCart);
router.post('/:productId', isAuth, cartController.createCart);
router.put('/:id', isAuth, cartController.updateCart);
router.delete('/:id', isAuth, cartController.removeCart);

export default router;
