import connection from '../database/database.js';

export async function validateToken(token) {
    const userId = await connection.query(`
        SELECT users.id FROM users
        JOIN authentication ON authentication."userId" = users.id
        WHERE authentication.token = $1
    `, [token]);

    if(userId.rows.length === 0) return null;

    return userId.rows[0].id;
}