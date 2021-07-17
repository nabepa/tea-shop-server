import * as cartRepository from '../data/cart.js';

export async function getCart(req, res) {
  const id = req.params.id;
  const cart = await cartRepository.getCart(id);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ message: `Cart(id:${id}) not found` });
  }
}

export async function getCartItems(req, res) {
  const id = req.params.id;
  const cart = await cartRepository.getCart(id);
  if (!cart) {
    res.status(404).json({ message: `Cart(id:${id}) not found` });
  }
  const cartItems = await cartRepository.getCartItems(cart);
  if (cartItems.length) {
    res.status(200).json(cartItems);
  } else {
    res.sendStatus(204);
  }
}

export async function getCartItem(req, res) {
  const id = req.params.id;
  const productId = req.params.productId;
  const cart = await cartRepository.getCart(id);
  if (!cart) {
    res.status(404).json({ message: `Cart(id:${id}) not found` });
  }
  const cartItem = await cartRepository.getCartItem(cart, productId);
  if (cartItem.length) {
    res.status(200).json(cartItem);
  } else {
    res.sendStatus(204);
  }
}

export async function createCartItem(req, res) {
  const id = req.params.id;
  const productId = req.params.productId;
  const cartItem = await cartRepository.createCartItem(id, productId);
  res.sendStatus(200);
  // res.json(cartItem);
}
