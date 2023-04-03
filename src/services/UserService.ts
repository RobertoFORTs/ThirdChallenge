import { HydratedDocument } from "mongoose";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { IUser } from "../models/userModel/IUser";
import { UserRepository } from "../repositories/userRepository/UserRepository";

export class UserService{

  constructor(public repository: UserRepository){
    this.repository = repository;
  }

  async RegisterUserService(user: CreateUserDTO): Promise<HydratedDocument<IUser>>{

    //implement the cep logic and send the complete object to the repository
    
    const newObj ={};


    const user = await this.repository.registerUserUp(newObj);


    return user;
  }
}