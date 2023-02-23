import { validate } from "../services/userService.js";
import { getAllTransactions } from "../repositories/getTransactionsRepository.js";

export async function getTransactions(req, res) {
    try {
        const authorization = req.header("Authorization");
        
        const userId = await validate(authorization);

        if(userId === null) return res.sendStatus(401);

        const transactions = await getAllTransactions(userId);

        res.send(transactions).status(200);

    } catch {
        res.sendStatus(500);
    }
}

