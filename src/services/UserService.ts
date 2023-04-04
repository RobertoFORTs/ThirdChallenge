import { HydratedDocument } from "mongoose";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { IUser } from "../models/userModel/IUser";
import { UserRepository } from "../repositories/userRepository/UserRepository";
import axios from "axios";
import { parseQualified } from "../utils/parseQualified";
import { AppError } from "../errors/AppError";
import { getValidCep } from "../utils/getValidCep";
import { object } from "joi";
import { UpdateUserDTO } from "../dto/UpdateUserDTO";

interface RequestToRegisterUser{
  name: string,
  birth: Date,
  email: string,
  password: string,
  cep: string,
  qualified: string | boolean
}

interface ResquestToUpdateUser{
  id: string,
  name: string,
  birth: Date,
  cep: string,
  qualified: string | boolean
}

export class UserService{

  constructor(public repository: UserRepository){
    this.repository = repository;
  }

  async registerUserService(requestbody: RequestToRegisterUser): Promise<HydratedDocument<IUser>>{

    requestbody.qualified = parseQualified(requestbody.qualified as string);

    const cep = requestbody.cep;
    Object.assign(requestbody, await getValidCep(cep));

    const user = await this.repository.registerUserUp(requestbody as CreateUserDTO);

    return user;
  }

  async updateUserService(requestbody: ResquestToUpdateUser): Promise<HydratedDocument<IUser> | null>{
    
    requestbody.qualified = parseQualified(requestbody.qualified as string);

    const cep = requestbody.cep;
    Object.assign( requestbody, await getValidCep(cep) );

    const updatedUser = await this.repository.updateUser(requestbody as UpdateUserDTO);
    if (!updatedUser){
      throw new AppError("User has not been found", 400);
    }

    return updatedUser;
  }

  async deleteByIdService(id: string): Promise<void>{
    
    await this.repository.deleteUser(id);

    return;
  }
}