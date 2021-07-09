import * as productRepository from '../data/products.js';

export function getProducts(req, res) {
  const data = productRepository.getAll();
  res.status(200).json(data);
}

export function getProduct(req, res) {
  const id = req.params.id;
  const product = productRepository.getById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: `Product id(${id}) not found` });
  }
}

export function createProduct(req, res) {
  const { category, name, flavour, price, stock, url } = req.body;
  const found = productRepository.getByName(name);
  if (found) {
    return res.status(409).json({ message: `${name} already exists` });
  }
  const product = productRepository.create(
    category,
    name,
    flavour,
    price,
    stock,
    url
  );
  res.status(201).json(product);
}

export function updateProduct(req, res) {
  const id = req.params.id;
  const { price, stock, url } = req.body;
  const product = productRepository.getById(id);
  if (!product) {
    return res.status(404).json({ message: `Product id(${id}) not found.` });
  }
  const updated = productRepository.update(id);
  res.status(200).json(updated);
}

export function removeProduct(req, res) {
  const id = req.params.id;
  const product = productRepository.getById(id);
  if (!product) {
    return res.status(404).json({ message: `Product id(${id}) not found.` });
  }
  productRepository.remove(id);
  res.sendStatus(204);
}
