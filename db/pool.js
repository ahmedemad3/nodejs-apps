const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const db_config = {
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 300000,
    idleTimeoutMillis: 300000,
    max: 20,
  }

  const pool = new Pool(db_config);

  pool.on('connect', () => {
    console.log("database is connect");
  })


  pool.on('remove', () => {
    console.log("database connection removed");
  })

  module.exports = pool;