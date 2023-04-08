/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HydratedDocument, ObjectId } from "mongoose";
import { UserRepository } from "../repositories/userRepository/UserRepository";
import { AppError } from "../errors/AppError";
import { IUser } from "../models/userModel/IUser";
import { promisify } from "util";

interface Request {
  email: string,
  password: string
}

export class SessionService {

  constructor(private repository: UserRepository){
    this.repository = repository;
  }

  private signToken(id: ObjectId): string | Buffer{
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_TOKEN_EXPIRES!
    });
  }

  async executeLogin({email, password} : Request): Promise<object> {
    
    const currentUser = await this.repository.getUserByEmail(email);

    if (!currentUser || !(await bcrypt.compare(password, currentUser.password))){
			throw new AppError("incorrect email or password", 401);
		}

    const userToken = this.signToken(currentUser.id);

    const loginData = {
      token: userToken,
      email: email,
      qualified: currentUser.qualified
    }

    return loginData;
  }

  async executeGrantAccess(authorization: string | undefined, ): Promise<HydratedDocument<IUser>> {
    let token: string;
  
    if (authorization) {
      token = authorization.split(" ")[1];
    } 
    else{
      throw new AppError("Please log in to gain access", 401);
    }
  
    const validateToken: any = await promisify(jwt.verify)(token, process.env.JWT_SECRET!);
    
    const currentUser = await this.repository.getUserById(validateToken.id);
    
    if (!currentUser){
      throw new AppError("User does not exist", 404);
    }

    return currentUser;
  }
}