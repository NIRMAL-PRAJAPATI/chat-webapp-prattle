// const pool = require('pg').Pool;

// const data = new pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'prattle',
//     password: 'root',
//     port: 5432,
// });

// module.exports = data;

// new connection which is required to connect project to neon server
const { Pool } = require('pg');

const data = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

data.on('connect', () => {
  console.log('Connected to Neon PostgreSQL via data!');
});

data.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = data;
