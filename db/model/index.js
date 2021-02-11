const { Pool } = require('pg');

const authorize = require('./config.js');

const pool = new Pool({
  user: authorize.user,
  database: authorize.database,
});

pool.connect();

module.exports = pool;
