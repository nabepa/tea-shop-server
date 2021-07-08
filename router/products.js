import express from 'express';
import 'express-async-errors';
import * as productController from '../controller/products.js';

const router = express.Router();

router.get('/', productController.getProducts);

export default router;
