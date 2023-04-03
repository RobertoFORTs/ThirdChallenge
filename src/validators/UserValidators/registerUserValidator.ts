import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { isValidCpf } from "../../utils/isValidCpf";
import { AppError } from "../../errors/AppError";

const requestValidation = Joi.object({
  name: Joi.string().required().messages({ "string.required": "Name is required" }),
  cpf: Joi.string().required().messages({ "string.required": "CPF is required" }),
  birth: Joi.date().required().messages({ "date.base": "Date time must be a valid date" }), 
  city: Joi.string().required().messages({ "string.required": "City is required" }), 
  email: Joi.string().email().required().messages({ "string.required": "Email is required" }),
  password: Joi.string().min(6).empty().required().messages({
    "string.min": "password should be min 6 characters",
    "string.empty": "password cannot be an empty field", 
    "string.required": "password is required" }),
  cep: Joi.string().required().messages({ "string.required": "cep is required" })
});

async function registerUserValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!isValidCpf(req.body.cpf)){
    throw new AppError("Cpf is invalid", 400);
  }
  await requestValidation.validateAsync(req.body);

  return next();
}

export { registerUserValidator };