import connection from '../database/database.js';

export async function getAllTransactions(userId) {
    const result = await connection.query(`
        SELECT * FROM transactions 
        WHERE "userId" = $1
        ORDER BY date ASC, id ASC
    `, [userId]);

    return result.rows;
}