import connection from '../database/database.js';

export async function deleteTransactionData(id) {
    await connection.query(`
        DELETE FROM transactions
        WHERE id = $1
    `,[id])
}