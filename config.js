require('dotenv').config();

const {
  JWT_SECRET = 'dev_secret_key',
  PORT = 3000,
  DB_CONNECTION = 'mongodb://localhost:27017/moviedb',
} = process.env;

module.exports = {
  JWT_SECRET,
  PORT,
  DB_CONNECTION,
};
