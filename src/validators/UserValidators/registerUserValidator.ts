import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { isValidCpf } from "../../utils/isValidCpf";
import { AppError } from "../../errors/AppError";
import { isValidCep } from "../../utils/isValidCep";
import { isQualifiedValid } from "../../utils/isQualifiedValid";

const requestValidation = Joi.object({
  name: Joi.string().required().messages({ "string.required": "Name is required" }),
  cpf: Joi.string().required().messages({ "string.required": "CPF is required" }),
  birth: Joi.date().required().messages({ "date.base": "Date time must be a valid date" }),  
  email: Joi.string().email().required().messages({ "string.required": "Email is required" }),
  password: Joi.string().min(6).empty().required().messages({
    "string.min": "password should be min 6 characters",
    "string.empty": "password cannot be an empty field", 
    "string.required": "password is required" 
  }),
  cep: Joi.string().required().messages({ "string.required": "cep is required" }),
  qualified: Joi.string().required().messages({ "string.required": "Qualified is a required field" }),
});

async function registerUserValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  req.body.cep = req.body.cep.replace(/[-]/g,"");
  req.body.cpf = req.body.cpf.replace(/\.|-/g, "");
  await requestValidation.validateAsync(req.body);

  if (!isValidCpf(req.body.cpf)){
    throw new AppError("Cpf is invalid", 400);
  }
  if (!isValidCep(req.body.cep)){
    throw new AppError("Cep is invalid", 400);
  }
  if (!isQualifiedValid(req.body.qualified)){
    throw new AppError("Qualified should be field with 'yes' or 'no'.", 400);
  }

  return next();
}

export { registerUserValidator };