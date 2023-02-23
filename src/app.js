import express from 'express';
import cors from 'cors';
import { login } from './controllers/userController.js';
import { signUp } from './controllers/signUpController.js';
import { getTransactions, insertTransaction, deleteTransaction } from './controllers/transactionsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);

app.post('/login', login);

app.get('/transactions', getTransactions)

app.post('/transactions', insertTransaction)

app.delete('/transactions/:id', deleteTransaction)

app.post('/test', (req,res) => {
    res.sendStatus(200);
})

export default app;