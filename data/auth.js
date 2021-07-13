import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

const User = sequelize.define(
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
    admin: { type: DataTypes.BOOLEAN, allowNull: false },
    url: DataTypes.TEXT,
  },
  { timestamps: false }
);

export async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

export async function findById(id) {
  return User.findOne({ where: { id } });
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
}
