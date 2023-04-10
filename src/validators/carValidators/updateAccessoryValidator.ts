import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const requestValidation = Joi.object({
  description: Joi.string().required().messages({ "string.required": "description is required"})
});

async function updateAccessoryValidator(req: Request, res: Response, next: NextFunction): Promise<void> {

  await requestValidation.validateAsync(req.body);

  return next();
}

export { updateAccessoryValidator };