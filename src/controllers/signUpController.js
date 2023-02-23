import { userSchema } from "../schemas/userSchema.js";
import { authenticateSignUp } from "../services/signUpService.js";

export async function signUp(req, res) {
    try {
        const userObject = await userSchema(req.body);

        const authenticate = await authenticateSignUp (userObject)

        if (authenticate === null) return res.sendStatus(409);

        res.sendStatus(201);
    } catch(e) {
        console.log(e)
        res.sendStatus(500);
    }
}