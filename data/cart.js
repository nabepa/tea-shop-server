import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { Product } from './product.js';
import { CartItem } from './cartItem.js';
import { raw } from 'express';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Cart = sequelize.define(
  'cart',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);
Cart.belongsToMany(Product, { through: CartItem });

export async function getCart(id) {
  return Cart.findOne({ where: { id } });
}

export async function getCartItems(cart) {
  return await cart.getProducts();
}

export async function getCartItem(cart, productId) {
  // const item = await cart.getProducts({ where: { id: productId } });
  // const item = await cart.getProducts({ where: { id: productId }, raw: true });
  // const item = await cart.getProducts({
  //   where: { id: productId },
  //   attributes: ['id', [Sequelize.col('cartItem.quantity'), 'quantity']],
  //   raw: true,
  // });
  const item = await Cart.findAll({
    where: { id: productId },
    include: ProductItem,
  });
  return item;
}

export async function createCartItem(id, productId) {
  const cart = await this.getCart(id);
  cart.getProducts().then(console.log);
}

// Model {
//   _customGetters: {},
//   _customSetters: {},
//   validators: {},
//   _hasCustomGetters: 0,
//   _hasCustomSetters: 0,
//   rawAttributes: {
//     id: {
//       type: [INTEGER],
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//       Model: cart,
//       fieldName: 'id',
//       _modelAttribute: true,
//       field: 'id'
//     }
//   },
//   _isAttribute: [Function (anonymous)],
//   getProducts: [Function (anonymous)],
//   countProducts: [Function (anonymous)],
//   hasProduct: [Function (anonymous)],
//   hasProducts: [Function (anonymous)],
//   setProducts: [Function (anonymous)],
//   addProduct: [Function (anonymous)],
//   addProducts: [Function (anonymous)],
//   removeProduct: [Function (anonymous)],
//   removeProducts: [Function (anonymous)],
//   createProduct: [Function (anonymous)],
//   getUser: [Function (anonymous)],
//   setUser: [Function (anonymous)],
//   createUser: [Function (anonymous)]
// }
