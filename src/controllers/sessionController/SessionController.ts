import { promisify } from "util";
import { AppError } from "../../errors/AppError";
import { User } from "../../models/userModel/User";
import { UserRepository } from "../../repositories/userRepository/UserRepository";
import { SessionService } from "../../services/SessionService";
import { ISessionController } from "./ISessionController";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const userRepository = new UserRepository(User);
const sessionService = new SessionService(userRepository);

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

  static async authGrantAccess (req: Request, res: Response, next: NextFunction): Promise<void>{
    let token: string;
  
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } 
    else{
      return next( new AppError("Please log in to gain access", 401));
    }
  
    const validateToken: any = await promisify(jwt.verify)(token, process.env.JWT_SECRET!);
    console.log(validateToken);
    
    const current = await sessionService.executeGrantAccess(validateToken.id);
    
    res.locals.user = current;
    return next();
  }
}