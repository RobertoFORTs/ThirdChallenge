import { ObjectId } from "mongoose";
import { UserRepository } from "../repositories/userRepository/UserRepository";

export class AuthService {

  constructor(private repository: UserRepository){
    this.repository = repository;
  }

  private signToken(_id: ObjectId): string{
    return '';
  }

  private sendToken(token: string){
    return '';
  }

  login():object {
    return {};
  }
}