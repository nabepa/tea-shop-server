import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  flavour: DataTypes.TEXT,
  url: DataTypes.TEXT,
});

const ORDER_DESC = { order: [['createdAt', 'DESC']] };

export async function getAll() {
  return Product.findAll({ ...ORDER_DESC });
}

export async function getByName(name) {
  return Product.findOne({ where: { name } });
}

export async function getById(id) {
  return Product.findOne({ where: { id } });
}

export async function create(category, name, flavour, price, stock, url) {
  return Product.create({ category, name, flavour, price, stock, url }) //
    .then((data) => this.getById(data.dataValues.id));
}

export async function update(id, category, name, flavour, price, stock, url) {
  return Product.findByPk(id) //
    .then((product) => {
      product.category = category ?? product.category;
      product.name = name ?? product.name;
      product.flavour = flavour ?? product.flavour;
      product.price = price ?? product.price;
      product.stock = stock ?? product.stock;
      product.url = url ?? product.url;
      return product.save();
    });
}

export async function remove(id) {
  return Product.findByPk(id) //
    .then((product) => {
      product.destroy();
    });
}
