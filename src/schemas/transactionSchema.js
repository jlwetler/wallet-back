import BaseJoi from 'joi';
import JoiDate from '@joi/date';

export async function transactionSchema(body) {
    const joi = BaseJoi.extend(JoiDate);
    
    const transactionSchema = joi.object({
        value: joi.number().min(1).required(), 
        description: joi.string().min(3).max(30).required(),
        moneyEntry: joi.boolean().required(),
        date: joi.date().format('YYYY-MM-DD').required(),
        userId: joi.number().min(1).required()
    })
    const transactionObject = await transactionSchema.validateAsync(body);

    return transactionObject;
}