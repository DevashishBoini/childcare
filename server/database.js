const {Pool} = require('pg/lib')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'CCMS'
});

module.exports = pool