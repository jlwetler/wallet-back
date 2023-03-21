import '../src/setup.js';
import app from '../src/app.js';
import supertest from 'supertest';
import { userBody,  cleanDatabase, endConnection } from './utils.js';
import { signUpFactory, loginFactory } from './factories/authenticationFactories.js'

beforeEach(cleanDatabase);

afterAll(async () => {
    await cleanDatabase();
    await endConnection();
});

describe("POST /sign-up", () => {
    it("should respond with status 201 when there is no user with given email", async () => {
        const response = await signUpFactory();
        
        expect(response.status).toEqual(201);
    });

    it("should respond with status 409 when there is another user with given email", async () => {
        await signUpFactory();
        
        const response = await signUpFactory();
        
        expect(response.status).toEqual(409);
    })
});