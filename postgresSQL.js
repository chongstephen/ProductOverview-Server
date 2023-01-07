require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'products_overview',
  password: 's2254762',
  port: 5432,
});

module.exports = db;