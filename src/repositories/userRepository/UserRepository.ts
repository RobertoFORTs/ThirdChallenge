import { Model, HydratedDocument } from "mongoose";
import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { IUser } from "../../models/userModel/IUser";
import { IUserRepository } from "./IUserRepository";
import { UpdateUserDTO } from "../../dto/UpdateUserDTO";


export class UserRepository implements IUserRepository{

  constructor(private repository: Model<IUser>){
    this.repository = repository;
  }

  async getUsers(queryObj: object, pagConfig: number[]): Promise<object[]> {
    
    const totalNumOfDoc = await this.repository.find().countDocuments();
    const objResponse = await this.repository.find(queryObj).skip(pagConfig[0]).limit(pagConfig[1]);
    const numberOfDoc = {
      total: totalNumOfDoc
    }
    objResponse.push(numberOfDoc);

    return objResponse;

  }

  async getUserById(id: string): Promise<HydratedDocument<IUser> | null>{
    
    const user = await this.repository.findById(id);

    return user;

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

  async updateUser({id, name, cpf, birth, cep, qualified, patio, complement, neighborhood, locality, uf}: UpdateUserDTO): Promise<HydratedDocument<IUser> | null> {
    
    const updatedUser = await this.repository.findByIdAndUpdate(id, 
    {
      name,
      cpf,
      birth,
      cep,
      qualified,
      patio,
      complement,
      neighborhood,
      locality,
      uf
    }, 
    {
      new: true
    });

    return updatedUser;

  }
  async deleteUser(id: string): Promise<number> {
    
    const {deletedCount} = await this.repository.deleteOne({_id: id});

    return deletedCount;
    
  }
}