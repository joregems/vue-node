require('dotenv').config(); // this is important!
// const process = require('process');
const env = process.env;
module.exports = {
  [env.NODE_ENV]:  {
    "database": env.POSTGRES_DB,
    "dialect": env.DATABASE_DIALECT,
    "username": env.POSTGRES_USER,
    "password": env.POSTGRES_PASSWORD,
    "host": env.POSTGRES_HOST,
    "port": env.POSTGRES_PORT
  }
}
