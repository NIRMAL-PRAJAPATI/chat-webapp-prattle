const pool = require('pg').Pool;

const user_data = new pool({
    user: 'postgres',
    host: 'localhost',
    database: 'prattle_user',
    password: 'root',
    port: 5432,
});

module.exports = user_data;