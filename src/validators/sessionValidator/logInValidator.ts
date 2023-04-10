import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const requestValidation = Joi.object({
  email: Joi.string().email().required().messages({ "string.required": "Email is required" }),
  password: Joi.string().required().messages({ "string.required": "Password is required" }),
});

async function logInValidator (req: Request, res: Response, next: NextFunction): Promise<void> {
  await requestValidation.validateAsync(req.body);
    
  return next();
}

export { logInValidator };