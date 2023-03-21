import app from '../../src/app.js';
import { userBody } from '../utils.js';
import supertest from 'supertest';

export async function signUpFactory() {
    const response = await supertest(app).post("/sign-up").send(userBody);
    
    return response;
}

export async function loginFactory() {
    await signUpFactory();

    const user = await supertest(app).post("/login").send({ email: userBody.email, password: userBody.password });

    return user;
}

export async function tokenFactory() {
    const user = await loginFactory();
    
    const { token } = user.body;
    
    return token;
}