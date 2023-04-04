import { User } from "../../models/userModel/User";
import { UserRepository } from "../../repositories/userRepository/UserRepository";
import { SessionService } from "../../services/SessionService";
import { ISessionController } from "./ISessionController";
import { Request, Response } from "express";

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
}