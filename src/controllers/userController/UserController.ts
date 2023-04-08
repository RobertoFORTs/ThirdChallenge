import { User } from "../../models/userModel/User";
import { Request, Response } from "express";
import { UserRepository } from "../../repositories/userRepository/UserRepository";
import { UserService } from "../../services/UserService";
import { IUserController } from "./IUserController";


const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

export class UserController implements IUserController {

  async getUsers(req: Request, res: Response): Promise<Response> {
    
    const queryObj = req.query;
    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 100
    };
  
    const objResponse: object[] = await userService.getUsersService(queryObj, pagination);
    const numberOfPages = objResponse.length/parseInt(pagination.limit as string);
    const offsets =  numberOfPages < 1 ?  1 : numberOfPages;

    return res.status(200).json({
      status: "success",
      data: {
        objResponse,
        limit: pagination.limit,
        offset: pagination.page,
        offsets: offsets
      }
    });
  }
  
  async getUserById(req: Request, res: Response): Promise<Response> {
    
    const id = req.params.id;
    const user = await userService.getUserByIdService(id);

    return res.status(200).json({
      status: "success",
      data: {
        user
      }
    })
  }

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
  async deleteUser(req: Request, res: Response): Promise<Response> {
    
    const id = req.params.id;

    await userService.deleteByIdService(id);

    return res.status(204).send();
  }

}