import { HydratedDocument } from "mongoose";
import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { IUser } from "../../models/userModel/IUser";
import { UpdateUserDTO } from "../../dto/UpdateUserDTO";

export interface IUserRepository{
  registerUserUp(user: CreateUserDTO): Promise<HydratedDocument<IUser>>,  
  getUserByEmail(email: string): Promise<HydratedDocument<IUser> | null>,
  updateUser(user: UpdateUserDTO): Promise<HydratedDocument<IUser> | null>,
  deleteUser(id: string): void,
  getUsers(queryObj: object, pagination: object): Promise<object[]>,
  getUserById(id: string): Promise<HydratedDocument<IUser> | null>
}