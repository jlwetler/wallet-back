import { validate } from "../services/userService.js";
import { getAllTransactions } from "../repositories/getTransactionsRepository.js";
import { postTransaction } from "../repositories/insertTransactionRepository.js";
import { transactionSchema } from "../schemas/transactionSchema.js";

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

export async function insertTransaction(req, res) {
    try {
        const transactionObject = await transactionSchema(req.body);

        const authorization = req.header("Authorization");
        
        const userId = await validate(authorization);

        if(userId === null) return res.sendStatus(401);
        
        await postTransaction(transactionObject, userId)

        res.sendStatus(201);
    
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}