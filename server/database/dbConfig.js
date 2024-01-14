const { Pool } = require('pg');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const pool = new Pool(dbConfig);

module.exports = pool;