import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Joi from "joi";
import { AppError } from "../../errors/AppError";



const requestValidation = Joi.object({
  model: Joi.string().required().messages({ "string.required": "Model is required" }),
  color: Joi.string().required().messages({ "string.required": "Color is required" }),
  year: Joi.string().required().messages({ "date.base": " Year must be a valid date" }),  
  value_per_day: Joi.number().required().messages({ "number.required": "Value is required and must be a number" }),
  accesories: Joi.array().items(Joi.object({description: Joi.string().required()}).required()).required().messages({ 
    "array.required": "Accesories is a required field",
    "object.required": "Accesories must have at least one item",
    "string.required": "Description is required"
  }),
  number_of_passengers: Joi.number().required().messages({"number.required": "Value is required and must be a number"})
});

async function resgisterCarValidator(req: Request, res: Response, next: NextFunction): Promise<void> {

  await requestValidation.validateAsync(req.body);

  return next();
}

export { resgisterCarValidator };