import { HydratedDocument } from "mongoose";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { IUser } from "../models/userModel/IUser";
import { UserRepository } from "../repositories/userRepository/UserRepository";
import axios from "axios";

interface RequestToRegisterUser{
  name: string,
  birth: Date,
  email: string,
  password: string,
  cep: number,
  qualified: string,
}

export class UserService{

  constructor(public repository: UserRepository){
    this.repository = repository;
  }

  async RegisterUserService(requestbody: RequestToRegisterUser): Promise<HydratedDocument<IUser>>{

    //implement the cep logic and send the complete object to the repository
    const cep = requestbody.cep;

    const dados = await axios.post(`https://viacep.com.br/ws/${cep}/json`);
    Object.assign(requestbody, dados);

    const user = await this.repository.registerUserUp(requestbody as CreateUserDTO);

    return user;
  }
}