import { findUser } from "../repositories/userRepository.js";
import { authenticate } from "../services/userService.js";

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        if(!email || !password) return res.sendStatus(400);

        const user = await findUser(email);

        const authentication = await authenticate(user, password);

        if(authentication === null) return res.sendStatus(401);

        res.send(authentication.rows[0]).status(200);

    } catch(e){
        console.log(e)
        res.sendStatus(500);
    }
}