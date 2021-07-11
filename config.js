import dotenv from 'dotenv';
dotenv.config();

function required(key, defalutValue = undefined) {
  const value = process.env[key] || defalutValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('MYSQL_PASSWORD'),
    port: required('DB_PORT'),
  },
};
