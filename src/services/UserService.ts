import { HydratedDocument } from "mongoose";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { IUser } from "../models/userModel/IUser";
import { UserRepository } from "../repositories/userRepository/UserRepository";
import axios from "axios";
import { parseQualified } from "../utils/parseQualified";

interface RequestToRegisterUser{
  name: string,
  birth: Date,
  email: string,
  password: string,
  cep: string,
  qualified: string | boolean
}

export class UserService{

  constructor(public repository: UserRepository){
    this.repository = repository;
  }

  async registerUserService(requestbody: RequestToRegisterUser): Promise<HydratedDocument<IUser>>{

    const cep = requestbody.cep;
    const dados = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    Object.assign( requestbody, dados );

    requestbody.qualified = parseQualified(requestbody.qualified as string)

    const user = await this.repository.registerUserUp(requestbody as CreateUserDTO);

    return user;
  }

  async U
}