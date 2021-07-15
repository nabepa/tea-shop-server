import express from 'express';
import 'express-async-errors';
import { isAdmin } from '../middleware/auth.js';
import * as productController from '../controller/product.js';

const router = express.Router();

// Todo: Product validation

router.get('/', isAdmin, productController.getProducts);
router.get('/:id', isAdmin, productController.getProduct);
router.post('/', isAdmin, productController.createProduct);
router.put('/:id', isAdmin, productController.updateProduct);
router.delete('/:id', isAdmin, productController.removeProduct);

export default router;
