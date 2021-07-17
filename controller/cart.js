import * as cartRepository from '../data/cart.js';

export async function getCart(req, res) {
  const id = req.params.id;
  const cart = await cartRepository.getById(id);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ message: `Cart id(${id}) not found` });
  }
}

export async function createCartItem(req, res) {
  const id = req.params.id;
  const productId = req.params.productId;
  const cartItem = await cartRepository.createCartItem(id, productId);
  res.sendStatus(200);
  // res.json(cartItem);
}
