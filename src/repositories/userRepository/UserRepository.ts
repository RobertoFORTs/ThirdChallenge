import { Schema, Model, HydratedDocument } from "mongoose";
import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { IUser } from "../../models/userModel/IUser";
import { IUserRepository } from "./IUserRepository";
import { UpdateUserDTO } from "../../dto/UpdateUserDTO";

export class UserRepository implements IUserRepository{

  constructor(private repository: Model<IUser>){
    this.repository = repository;
  }
  
  async registerUserUp({name, cpf, birth, email, password, cep, qualified, patio, complement, neighborhood, locality, uf}: CreateUserDTO): Promise<HydratedDocument<IUser>> {
    const user = await this.repository.create({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
      patio,
      complement,
      neighborhood,
      locality,
      uf
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<HydratedDocument<IUser> | null>{
    
    const user: HydratedDocument<IUser> | null = await this.repository.findOne({ email }).select("+password");
		
		return user;
		
  }

  async updateUser({id, name, cpf, birth, email, password, cep, qualified, patio, complement, neighborhood, locality, uf}: UpdateUserDTO): Promise<HydratedDocument<IUser> | null> {
    
    const updatedUser = await this.repository.findByIdAndUpdate(id, {
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
      patio,
      complement,
      neighborhood,
      locality,
      uf
    });

    return updatedUser;
  }
  async deleteUser(id: Schema.Types.ObjectId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}