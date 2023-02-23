import { createSession } from "../repositories/sessionRepository.js";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { validateToken } from "../repositories/tokenRepository.js";

export async function authenticate(user, password) {
    if(user && bcrypt.compareSync(password, user.password)) {
        const id = user.id;
        const token = uuid();

        const session = await createSession(id, token);

        return session;
    } else {
        return null;
    }
}

export async function validate(authorization) {
    const token = authorization?.replace("Bearer ", "");
    const userId = await validateToken(token);

    if(userId === null) return null;

    return userId;
}