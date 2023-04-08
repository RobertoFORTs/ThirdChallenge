import { HydratedDocument } from "mongoose";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { IUser } from "../models/userModel/IUser";
import { UserRepository } from "../repositories/userRepository/UserRepository";
import { parseQualified } from "../utils/parseQualified";
import { AppError } from "../errors/AppError";
import { getValidCep } from "../utils/getValidCep";
import { UpdateUserDTO } from "../dto/UpdateUserDTO";
import { QueryFeatures } from "../utils/QueryFeatures";

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

  async getUsersService(queryObj: object, pagination: object): Promise<object[]>{
    
    let finalObject: object = {};
    
    if (queryObj && !queryObj.hasOwnProperty("page") && !queryObj.hasOwnProperty("limit")){
      const queryString = QueryFeatures.filter(queryObj);
      finalObject = JSON.parse(queryString);
    }
    const pageConfig = QueryFeatures.paginate(pagination);
    const objResponse = await this.repository.getUsers(finalObject, pageConfig);

    if (objResponse.length === 0){
      throw new AppError(" There are no users ", 404);
    }

    return objResponse;
  }

  async getUserByIdService(id:string): Promise<HydratedDocument<IUser> | null>{

    const user = await this.repository.getUserById(id);

    if (!user){
      throw new AppError("User not found", 404);
    }

    return user;
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
    
    const deletedcount = await this.repository.deleteUser(id);

    if (!deletedcount){
      throw new AppError("User not found", 404);
    }

    return;
  }
}