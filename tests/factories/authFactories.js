import app from '../../src/app';
import { userBody } from '../utils';
import supertest from 'supertest';

export async function signUpFactory() {
    const response = await supertest(app).post("/sign-up").send(userBody);
    
    return response;
}

export async function loginFactory() {
    await signUpFactory();
    await signAddressFactory(addressBody);

    const user = await supertest(app).post("/login").send({ email: userBody.email, password: userBody.password });

    return user;
}