// BUG FIX: Ensure dotenv is loaded before accessing process.env
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

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

// BUG FIX: Old code did process.exit(-1) which crashes the ENTIRE server
// on transient network hiccups or Neon cold-start timeouts.
// Now we log and let the pool recover on its own.
data.on('error', (err) => {
  console.error('PostgreSQL pool idle client error:', err.message);
  // Don't exit — the pool will create a new connection on the next query
});

module.exports = data;
