import connection from '../database/database.js';

export async function emailCheck(email) {
    const emailCheck = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [email]);

    if(emailCheck.rows.length !== 0) return null;
}