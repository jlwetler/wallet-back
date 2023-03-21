import connection from "../src/database/database.js"

export const userBody = {
    name: 'Fulano',
    email: 'fulano@email.com',
    password: '123456'
}

export async function cleanDatabase() {
    await connection.query(`TRUNCATE authentication RESTART IDENTITY`);
    await connection.query(`TRUNCATE users RESTART IDENTITY`);
    await connection.query(`TRUNCATE transactions RESTART IDENTITY`);
}

export async function endConnection() {
    await connection.end();
}