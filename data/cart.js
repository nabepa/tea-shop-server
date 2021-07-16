import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { Product } from './product.js';
import { CartItem } from './cartItem.js';
const DataTypes = SQ.DataTypes;

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

export async function getById(id) {
  return Cart.findOne({ where: { id } });
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
