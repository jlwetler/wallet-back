import connection from '../database/database.js';

export async function postTransaction(transactionObject, userId) {
    const { value, description, moneyEntry, date } = transactionObject;

    await connection.query(`
        INSERT INTO transactions (value, description, "moneyEntry", date, "userId")
        VALUES ($1, $2, $3, $4, $5)
    `,[value, description, moneyEntry, date, userId]);


}