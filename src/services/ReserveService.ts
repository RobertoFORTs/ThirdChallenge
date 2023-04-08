/* eslint-disable no-prototype-builtins */
import { HydratedDocument } from "mongoose";
import { AppError } from "../errors/AppError";
import { QueryFeatures } from "../utils/QueryFeatures";
import { IReserveRepository } from "../repositories/reserveRepository/IReserveRepository";
import { IReserve } from "../models/reserveModel/IReserve";
import { IUpdateReserveDTO } from "../dto/UpdateReserveDTO";
import { ICreateReserveDTO } from "../dto/CreateReserveDTO";
import { CarService } from "./CarService";
import { CarRepository } from "../repositories/carRepository/CarRepository";
import { Car } from "../models/carModel/Car";
import { UserRepository } from "../repositories/userRepository/UserRepository";
import { User } from "../models/userModel/User";
import { UserService } from "./UserService";

interface IRequestToRegister{
  user_id: string,
  start_date: Date,
  end_date: Date,
  id_car: string,
}

interface IRequestToUpdate extends IRequestToRegister{
  id_reserve: string
}

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

const carRepository = new CarRepository(Car);
const carService = new CarService(carRepository);

export class ReserveService {

  constructor(private repository: IReserveRepository){
    this.repository = repository;
  }

  private async validateReservation(body: IRequestToRegister | IRequestToUpdate): Promise<object>{
    
    const car = await carService.executeGetCarById(body.id_car);

    const user = await userService.getUserByIdService(body.user_id);

    if (!user?.qualified){
      throw new AppError("User is not allowed to make reserves: Not qualified", 400);
    }

    const isOverlapping = await this.repository.findIfOverlaps(body.start_date, body.end_date, body.user_id);

    if (isOverlapping > 0){
      throw new AppError("User already made a reservation on the same period", 400);
    }

    const isCarOverlapping = await this.repository.findIfCarIsAvailable(body.start_date, body.end_date, body.id_car);

    if (isCarOverlapping > 0){
      throw new AppError("Car is not available!", 400);
    } 

    const endDate = body.end_date.getHours();
    const startDate = body.end_date.getHours();
    const numberOfDays = (endDate - startDate)/24;
    const total = car.value_per_day * numberOfDays;
    const value = {
      final_value: total
    };

    return value;
  }


  async executeGetReserves(queryObj: object, pagination: object): Promise<object[] | string>{
    let finalObject: object = {};
    
    if (queryObj && !queryObj.hasOwnProperty("page") && !queryObj.hasOwnProperty("limit")){
      const queryString = QueryFeatures.filter(queryObj);
      finalObject = JSON.parse(queryString);
    }
    const pageConfig = QueryFeatures.paginate(pagination);
    const objResponse = await this.repository.getReserves(finalObject, pageConfig);

    if (objResponse.length === 0){
      const message = "There are no users";
      return message;
    }

    return objResponse;
  }

  async executeGetReserveById(id: string): Promise<HydratedDocument<IReserve>>{

    const reserve = await this.repository.getReserveById(id);

    if (!reserve){
      throw new AppError("Reserve not found", 404);
    }

    return reserve;

  }

  async executeRegister(body: IRequestToRegister): Promise<HydratedDocument<IReserve>> {

    const value = await this.validateReservation(body); 

    Object.assign(body, value);

    const reserve = await this.repository.registerReserve(body as ICreateReserveDTO);

    return reserve;
  }

  async executeUpdateReserve(body: IRequestToUpdate): Promise<HydratedDocument<IReserve>>{

    const value = await this.validateReservation(body);

    Object.assign(body, value);

    const reserve = await this.repository.updateReserve(body as IUpdateReserveDTO);

    if (!reserve){
      throw new AppError("Reserve not found", 404);
    }

    return reserve;
  }

  async executeDeleteReserve(id: string): Promise<void>{

    const deleteCount: number = await this.repository.deleteReserve(id);

    if (!deleteCount){
      throw new AppError("Reserve not found", 404);
    }
    
    return;
  }

}