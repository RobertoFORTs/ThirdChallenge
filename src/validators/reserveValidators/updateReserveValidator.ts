import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const requestValidation = Joi.object({
  id_user: Joi.string().required().messages({ "string.required": " Car id is required" }),
  start_date: Joi.date().required().messages({ "date.base": "start date is required and must be a valid date" }),
  end_date: Joi.date().required().messages({ "date.base": "end date is required and must be a valid date" }),
  id_car: Joi.string().required().messages({ "string.required": " Car id is required" })
});

async function updateReserveValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  
  await requestValidation.validateAsync(req.body);

  return next();
}

export { updateReserveValidator };