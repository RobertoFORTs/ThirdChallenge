import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import ValidCpf from "validate-cpf-joi";

const requestValidation = Joi.object({
  name: Joi.string().required().messages({ "string.required": "Name is required" }),
  cpf: ValidCpf.string().cpf().required().messages({
    "string.required":"CPF is required",
    "string.cpf": "CPF is invalid"
  }),
  birth: Joi.date().required().messages({ "date.base": "Date time must be a valid date" }), 
  city: Joi.string().required().messages({ "string.required": "City is required" }), 
  email: Joi.string().email().required().messages({ "string.required": "Email is required" }),
  password: Joi.string().min(8).empty().required().messages({
    "string.min": "password should be min 8 characters",
    "string.empty": "password cannot be an empty field", 
    "string.required": "password is required" }),
  cep: Joi.string().required().messages({ "string.required": "cep is required" })
});

async function registerUserValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  await requestValidation.validateAsync(req.body);

  return next();
}

export { registerUserValidator };