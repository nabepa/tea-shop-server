import * as productRepository from '../data/products.js';

export function getProducts(req, res) {
  const data = productRepository.getAll();
  res.status(200).json(data);
}
