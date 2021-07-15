import * as cartRepository from '../data/cart.js';

export async function getCartsOfUser(req, res) {
  const userId = req.userId;
  const data = await cartRepository.getAllByUserid(userId);
  res.status(200).json(data);
}

export async function getCart(req, res) {
  const id = req.params.id;
  const cart = await cartRepository.getById(id);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ message: `Cart id(${id}) not found` });
  }
}

export async function createCart(req, res) {
  const productId = req.params.productId;
  const { qty } = req.body;
  const cart = await cartRepository.create(qty, req.userId, productId);
  res.status(201).json(cart);
}

export async function updateCart(req, res) {
  const id = req.params.id;
  const { qty } = req.body;
  const cart = await cartRepository.getById(id);
  if (!cart) {
    return res.status(404).json({ message: `Cart not found: ${id}` });
  }
  if (cart.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await cartRepository.update(id, qty);
  res.status(200).json(updated);
}

export async function removeCart(req, res) {
  const id = req.params.id;
  const cart = await cartRepository.getById(id);
  if (!cart) {
    return res.status(404).json({ message: `Cart not found: ${id}` });
  }
  if (cart.userId !== req.cartId) {
    return res.sendStatus(403);
  }
  await cartRepository.remove(id);
  res.sendStatus(204);
}
