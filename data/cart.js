import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { Product } from './product.js';
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
  },
  { timestamps: false }
);

const INCLUDED = {
  attributes: [
    'id',
    // 'qty',
    // 'userId',
    // 'productId',
    // [Sequelize.col('product.name'), 'name'],
    // [Sequelize.col('product.price'), 'price'],
  ],
  include: {
    // model: [User, Product],
    // model: User,
    attributes: [],
  },
};

const ORDER_BY_NAME = {
  order: [['name', 'DESC']],
};

export async function getAll() {
  // return Cart.findAll({ ...INCLUDED, ...ORDER_BY_NAME });
  // return Cart.findAll({ ...INCLUDED });
  return Cart.findAll();
}

export async function getAllByUserid(userId) {
  // return Cart.findAll({
  // ...ORDER_BY_NAME,
  // include: { ...INCLUDED.include, where: { userId } },
  // });
  return Cart.findAll();
}

export async function getById(id) {
  return Cart.findOne({
    where: { id },
    ...INCLUDED,
  });
}

export async function create(qty, userId, productId) {
  return Cart.create({ qty, userId, productId }) //
    .then((data) => this.getById(data.dataValues.id));
}

export async function update(id, qty) {
  return Cart.findByPk(id, INCLUDED) //
    .then((cart) => {
      cart.qty = qty;
      return cart.save();
    });
}

export async function remove(id) {
  Cart.findByPk(id) //
    .then((cart) => {
      cart.destroy();
    });
}
