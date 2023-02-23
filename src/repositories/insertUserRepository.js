import connection from '../database/database.js';

export async function insertUserData (name, email, hashPassword) {
    await connection.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `, [name, email, hashPassword]);
}