const {Pool} = require('pg/lib')

const pool = new Pool({
    host: 'cms.czptthdtnwt9.us-east-2.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'Post_gres1',
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool