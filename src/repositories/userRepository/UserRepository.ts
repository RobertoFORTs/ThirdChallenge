import { Document, Types, Schema } from "mongoose";
import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { IUser } from "../../models/userModel/IUser";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository{

  
  
  registerUserUp(user: CreateUserDTO): Promise<Document<unknown, {}, IUser> & Omit<IUser & { _id: Types.ObjectId; }, never>> {
    throw new Error("Method not implemented.");
  }
  updateUser(user: CreateUserDTO): Promise<Document<unknown, {}, IUser> & Omit<IUser & { _id: Types.ObjectId; }, never>> {
    throw new Error("Method not implemented.");
  }
  deleteUser(id: Schema.Types.ObjectId): void {
    throw new Error("Method not implemented.");
  }
}