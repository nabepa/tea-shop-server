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

export async function getByEmail(email) {
  return User.findOne({ where: { email } });
}

export async function getById(id) {
  return User.findOne({ where: { id } });
}

export async function create(user) {
  const created = await User.create(user);
  // Todo:이렇게 상대방한테 억지로 foreign key 같은 것을 만들어주는게 정상적인 방법일까?
  const cart = await Cart.create({ userId: created.dataValues.id });
  cart.setUser(created);
  return created.dataValues.id;
}
