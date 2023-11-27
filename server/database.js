const {Pool} = require('pg/lib')

const pool = new Pool({
    host: 'cms.cojbzd4jmz9x.us-east-2.rds-preview.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'Post_gres1',
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool