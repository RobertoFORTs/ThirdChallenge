import { HydratedDocument } from "mongoose";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { IUser } from "../models/userModel/IUser";
import { UserRepository } from "../repositories/userRepository/UserRepository";
import axios from "axios";
import { parseQualified } from "../utils/parseQualified";
import { AppError } from "../errors/AppError";
import { getValidCep } from "../utils/getValidCep";
import { object } from "joi";

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
    const newObj: object = await getValidCep(cep);
    Object.assign(requestbody, newObj);

    const user = await this.repository.registerUserUp(requestbody as CreateUserDTO);

    return user;
  }

  async updateUserService(requestbody: ResquestToUpdateUser): Promise<HydratedDocument<IUser> | null>{
    
    const cep = requestbody.cep;
    const dados = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    
    Object.assign( requestbody, dados );

    requestbody.qualified = parseQualified(requestbody.qualified as string);
    
  }
}