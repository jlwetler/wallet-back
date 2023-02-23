import express from 'express';
import cors from 'cors';
import { login } from './controllers/userController.js';
import { signUp } from './controllers/signUpController.js';
import { getTransactions, insertTransaction } from './controllers/transactionsController.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import BaseJoi from 'joi';
import JoiDate from '@joi/date';
import connection from './database/database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);

app.post('/login', login);

app.get('/transactions', getTransactions)

app.post('/transactions', insertTransaction)

app.delete('/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");
    
        const validateToken = await connection.query(`
            SELECT * FROM users
            JOIN authentication ON authentication."userId" = users.id
            WHERE authentication.token = $1
        `, [token]);
            
        if(validateToken.rows.length === 0) return res.sendStatus(401);

        await connection.query(`
            DELETE FROM transactions
            WHERE id = $1
        `,[id])
        res.sendStatus(200);

    } catch {
        res.sendStatus(500);
    }
});

app.post('/test', (req,res) => {
    res.sendStatus(200);
})

export default app;