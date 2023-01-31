import pg from 'pg';

const { Pool } = pg;

console.log(process.env.NODE_ENV);

const connection = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});
/*
DB_USER=postgres
DB_PASS=senha1234
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wallet
*/
export default connection;