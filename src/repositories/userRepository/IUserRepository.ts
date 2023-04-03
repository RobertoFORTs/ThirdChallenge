import { HydratedDocument, ObjectId } from "mongoose";
import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { IUser } from "../../models/userModel/IUser";

export interface IUserRepository{
  registerUserUp(user: CreateUserDTO): Promise<HydratedDocument<IUser>>,
  updateUser(user: CreateUserDTO): Promise<HydratedDocument<IUser>>,
  deleteUser(id: ObjectId): void
}