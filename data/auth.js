import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { Cart } from './cart.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    role: { type: DataTypes.INTEGER, allowNull: false },
    url: DataTypes.TEXT,
  },
  { timestamps: false }
);
Cart.hasOne(User);

export async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

export async function findById(id) {
  return User.findOne({ where: { id } });
}

export async function createUser(user) {
  const cart = await Cart.create();
  const created = await User.create(user);
  cart.setUser(created);
  return created.dataValues.id;
}
