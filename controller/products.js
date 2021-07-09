import * as productRepository from '../data/products.js';

export function getProducts(req, res) {
  const data = productRepository.getAll();
  res.status(200).json(data);
}

export function getProduct(req, res) {
  const id = req.params.id;
  const product = productRepository.getById(id);
  if (Object.keys(product).length === 0) {
    res.status(404).json({ message: `Product id(${id}) not found` });
  } else {
    res.status(200).json(product);
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
  const { category, name, flavour, price, stock, url } = req.body;
  const product = productRepository.getById(id);
  if (Object.keys(product).length === 0) {
    return res.status(404).json({ message: `Product id(${id}) not found.` });
  }
  const updated = productRepository.update(
    id,
    category,
    name,
    flavour,
    price,
    stock,
    url
  );
  res.status(200).json(updated);
}

export function removeProduct(req, res) {
  const id = req.params.id;
  const product = productRepository.getById(id);
  if (Object.keys(product).length === 0) {
    return res.status(404).json({ message: `Product id(${id}) not found.` });
  }
  productRepository.remove(id);
  res.sendStatus(204);
}
