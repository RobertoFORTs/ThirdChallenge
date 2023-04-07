import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const requestValidation = Joi.object({
  start_date: Joi.date().required().messages({ "date.required": "start date is required and must be a valid date" }),
  end_date: Joi.date().required().messages({ "date.required": "end date is required and must be a valid date" }),
  id_car: Joi.string().required().messages({ "string.required": " Year must be a valid date" }),
});

async function reserveDataValidator(req: Request, res: Response, next: NextFunction): Promise<void> {

  await requestValidation.validateAsync(req.body);

  return next();
}

export { reserveDataValidator };
