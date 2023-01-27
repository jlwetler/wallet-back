import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    user: 'postgres',
    password: 'senha1234',
    host: 'localhost',
    port: 5432,
    database: 'wallet'
});

export default connection;