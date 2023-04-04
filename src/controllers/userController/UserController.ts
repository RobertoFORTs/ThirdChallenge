import { User } from "../../models/userModel/User";
import { Request, Response } from "express";
import { UserRepository } from "../../repositories/userRepository/UserRepository";
import { UserService } from "../../services/UserService";
import { IUserController } from "./IUserController";

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

export class UserController implements IUserController {
  async registerUser(req: Request, res: Response): Promise<Response> {

    const newUser = await userService.registerUserService(req.body);

    return res.status(201).json({
      status: "success",
      message: "User succesfully registrated",
      data: {
        newUser
      }
    });

  }
  getUsers(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getUserById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  async updateUser(req: Request, res: Response): Promise<Response> {
    const objId = {
      id: req.params.id
    };
    Object.assign(req.body, objId);
    const updatedUser = await userService.updateUserService(req.body);

    return res.status(200).json({
      status: "success",
      message: "User has been updated",
      data: {
        updatedUser
      }
    });
  }
  deleteUser(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

}