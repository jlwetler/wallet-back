import connection from './database/database.js';

export async function findUser(email) {
    
    const result = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [email]);

    return result.rows[0];
}