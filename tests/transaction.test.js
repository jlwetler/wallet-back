import '../src/setup.js';
import app from '../src/app.js';
import supertest from 'supertest';
import {  cleanDatabase, endConnection } from './utils.js';
import { tokenFactory } from './factories/authFactories.js'
import { transaction } from './utils.js'

beforeEach(cleanDatabase);

afterAll(async () => {
    await cleanDatabase();
    await endConnection();
});

describe("POST /transactions", () => {
    it("should respond with status 401 when token is invalid", async () => {
        const token = "invalid_token";

        const response = await supertest(app).post("/transactions").set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(401);
    });

    it("should respond with status 201 when transaction is created", async () => {
        const token = await tokenFactory();

        const response = await supertest(app)
            .post("/transactions")
            .send(transaction)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(201);
    })
});