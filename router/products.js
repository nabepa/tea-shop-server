import express from 'express';
import 'express-async-errors';
import * as productController from '../controller/products.js';

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.removeProduct);

export default router;
