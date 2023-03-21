import { validate } from "../services/userService.js";
import { getAllTransactions } from "../repositories/getTransactionsRepository.js";
import { postTransaction } from "../repositories/insertTransactionRepository.js";
import { transactionSchema } from "../schemas/transactionSchema.js";
import { deleteTransactionData } from "../repositories/deleteTransactionRepository.js";

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
        const authorization = req.header("Authorization");
        
        const userId = await validate(authorization);
        
        if(userId === null) return res.sendStatus(401);
        
        const transactionObject = await transactionSchema(req.body);

        await postTransaction(transactionObject, userId)

        res.sendStatus(201);
    
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;
        const authorization = req.header("Authorization");
        const userId = await validate(authorization);

        if(userId === null) return res.sendStatus(401);

        await deleteTransactionData(id);

        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}