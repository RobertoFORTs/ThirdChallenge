import { promisify } from "util";
import { AppError } from "../../errors/AppError";
import { User } from "../../models/userModel/User";
import { UserRepository } from "../../repositories/userRepository/UserRepository";
import { SessionService } from "../../services/SessionService";
import { ISessionController } from "./ISessionController";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import { IUser } from "../../models/userModel/IUser";

const userRepository = new UserRepository(User);
const sessionService = new SessionService(userRepository);

interface AcessRequest{
  headers: { 
    authorization: string | undefined
  },
  user: HydratedDocument<IUser>
}

export class SessionController implements ISessionController{

  async login(req: Request, res: Response): Promise<Response>{

    const loggedUser: object = await sessionService.executeLogin(req.body);

    return res.status(200).json({
      status: "success",
      message: "User has logged in",
      data: {
        loggedUser
      }
    });
  }

  static async authGrantAccess (req: AcessRequest, res: Response, next: NextFunction): Promise<void>{
    
    const {authorization}= req.headers;
    const current = await sessionService.executeGrantAccess(authorization);
    
    req.user = current;
    res.locals.user = current;
    return next();
  }
}