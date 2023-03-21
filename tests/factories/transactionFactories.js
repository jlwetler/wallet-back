import app from '../../src/app.js';
import supertest from 'supertest';
import { transaction } from '../utils.js';

export async function transactionFactory(token) {
    
    const response = await supertest(app)
        .post("/transactions")
        .send(transaction)
        .set('Authorization', `Bearer ${token}`);

    return response;
};