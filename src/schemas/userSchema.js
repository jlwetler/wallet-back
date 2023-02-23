import joi from 'joi';

export async function userSchema(body) {
    const userSchema = joi.object({
        name: joi.string().min(3).max(30).trim().required(), 
        email: joi.string().min(3).email().required().label('Email') ,
        password: joi.string().min(4).required()
    })

    const userObject = await userSchema.validateAsync(body);

    return userObject;
}