import { Request, Response, NextFunction } from "express";

export function authGrantAccess (req: Request, res: Response, next: NextFunction): void{

  next();
}