import express from 'express';
import cors from 'cors';
import connection from './database/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const app = express();
app.use(cors());
app.use(express.json());

const joi = BaseJoi.extend(JoiDate);

app.post('/sign-up', async (req, res) => {
    try {
        const userSchema = joi.object({
            name: joi.string().min(3).max(30).trim().required(), 
            email: joi.string().min(3).email().required().label('Email') ,
            password: joi.string().min(4).required()
        })

        const object = await userSchema.validateAsync(req.body);

        const { name, email, password } = object;

        const emailCheck = await connection.query(`
            SELECT * FROM users WHERE email = $1
        `, [email]);

        if (emailCheck.rows.length !== 0) return res.sendStatus(409);

        const hashPassword = bcrypt.hashSync(password, 12);

        await connection.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
        `, [name, email, hashPassword]);

        res.sendStatus(201);
    } catch(e) {
        console.log(e)
        res.sendStatus(500);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await connection.query(`
            SELECT * FROM users WHERE email = $1
        `, [email]);

        const user = result.rows[0];

        if(user && bcrypt.compareSync(password, user.password)) {
            const id = user.id;
            const token = uuid();
            await connection.query(`
                INSERT INTO authentication (token, "userId")
                VALUES ($1, $2)            
            `,[token, id]);

            const session = await connection.query(`
                SELECT users.id, users.name, users.email, authentication.token
                FROM users JOIN authentication
                ON users.id = authentication."userId"
                WHERE users.id = $1
            `, [id]);
            res.send(session.rows[0]);
        } else {
            res.sendStatus(401);
        }
    } catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

app.get('/transactions', async (req, res) => {
    try {
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");
    
        const validateToken = await connection.query(`
            SELECT * FROM users
            JOIN authentication ON authentication."userId" = users.id
            WHERE authentication.token = $1
        `, [token]);
            
        if(validateToken.rows.length === 0) return res.sendStatus(401);

        const id = validateToken.rows[0].userId;

        const result = await connection.query(`
            SELECT * FROM transactions 
            WHERE "userId" = $1
            ORDER BY date ASC, id ASC
        `, [id]);
        res.send(result.rows).status(200);

    } catch {
        res.sendStatus(500);
    }
})

app.post('/transactions', async (req, res) => {
    try {
        const transactionSchema = joi.object({
            value: joi.number().min(1).required(), 
            description: joi.string().min(3).max(30).required(),
            moneyEntry: joi.boolean().required(),
            date: joi.date().format('YYYY-MM-DD').required(),
            userId: joi.number().min(1).required()
        })
        const object = await transactionSchema.validateAsync(req.body);
        const { value, description, moneyEntry, date, userId } = object;

        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");
  
        const validateToken = await connection.query(`
            SELECT * FROM users
            JOIN authentication ON authentication."userId" = users.id
            WHERE authentication.token = $1
        `, [token]);
        
        if(validateToken.rows.length === 0) return res.sendStatus(401);
        
        await connection.query(`
            INSERT INTO transactions (value, description, "moneyEntry", date, "userId")
            VALUES ($1, $2, $3, $4, $5)
        `,[value, description, moneyEntry, date, userId]);

        res.sendStatus(201);
    
    } catch {
        res.sendStatus(500);
    }
});

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