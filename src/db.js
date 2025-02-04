const pool = require('pg').Pool;

const data = new pool({
    user: 'postgres',
    host: 'localhost',
    database: 'prattle',
    password: 'root',
    port: 5432,
});

module.exports = data;