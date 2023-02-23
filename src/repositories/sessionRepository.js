import connection from './database/database.js';

export async function createSession(id, token) {
    await connection.query(`
        INSERT INTO authentication 
        (token, "userId")
        VALUES ($1, $2)            
    `,[token, id]);

    const session = await connection.query(`
        SELECT users.id, users.name, users.email, authentication.token
        FROM users JOIN authentication
        ON users.id = authentication."userId"
        WHERE users.id = $1
    `, [id]);
    
    return session;
}