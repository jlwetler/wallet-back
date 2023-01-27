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
 
});

app.get('/transactions', async (req, res) => {

})

app.post('/transactions', async (req, res) => {
 
});


app.listen(4000, () => {
    console.log("Server running on port 4000");
})