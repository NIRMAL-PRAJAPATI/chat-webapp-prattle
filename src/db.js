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
  connectionString: "postgresql://chat%20webapp_owner:npg_WgNcrT1zZB3d@ep-autumn-king-a5uevppq-pooler.us-east-2.aws.neon.tech/chat%20webapp?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  }
});

data.connect()
  .then(() => console.log("Connected to Neon PostgreSQL!"))
  .catch(err => console.error("Connection error", err));

module.exports = data;
