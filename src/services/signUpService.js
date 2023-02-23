import { emailCheck } from '../repositories/emailCheckRepository.js';
import { insertUserData } from '../repositories/insertUserRepository.js';
import bcrypt from 'bcrypt';

export async function authenticateSignUp(userObject) {
    const { name, email, password } = userObject;

    const check = await emailCheck(email);

    if (check === null) return null;

    const hashPassword = bcrypt.hashSync(password, 12);

    await insertUserData (name, email, hashPassword);        
}