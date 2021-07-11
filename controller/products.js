import * as productRepository from '../data/products.js';

export async function getProducts(req, res) {
  const data = await productRepository.getAll();
  res.status(200).json(data);
}

export async function getProduct(req, res) {
  const id = req.params.id;
  const product = await productRepository.getById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: `Product id(${id}) not found` });
  }
}

export async function createProduct(req, res) {
  const { category, name, flavour, price, stock, url } = req.body;
  const found = await productRepository.getByName(name);
  if (found) {
    return res.status(409).json({ message: `${name} already exists` });
  }
  const product = await productRepository.create(
    category,
    name,
    flavour,
    price,
    stock,
    url
  );
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const id = req.params.id;
  const { category, name, flavour, price, stock, url } = req.body;
  const product = await productRepository.getById(id);
  if (!product) {
    return res.status(404).json({ message: `Product id(${id}) not found.` });
  }
  const updated = await productRepository.update(
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

export async function removeProduct(req, res) {
  const id = req.params.id;
  productRepository.remove(id);
  res.sendStatus(204);
}
