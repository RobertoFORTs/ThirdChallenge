/* eslint-disable no-prototype-builtins */
import { HydratedDocument } from "mongoose";
import { ICarRepository } from "../repositories/carRepository/ICarRepository";
import { ICar } from "../models/carModel/ICar";
import { QueryFeatures } from "../utils/QueryFeatures";
import { AppError } from "../errors/AppError";
import { IUpdateCarDTO } from "../dto/UpdateCarDTO";

interface IRequestToRegister{
  model: string,
  color: string,
  year: Date,
  value_per_day: number,
  accessories: object[],
  number_of_passengers: number
}


export class CarService {
  
  constructor(private repository: ICarRepository) {
    this.repository = repository;
  }

  async executeGetCars(queryObj: object, pagination: object){
    let finalObject: object = {};
    
    if (queryObj && !queryObj.hasOwnProperty("page") && !queryObj.hasOwnProperty("limit")){
      const queryString = QueryFeatures.filter(queryObj);
      finalObject = JSON.parse(queryString);
    }
    const pageConfig = QueryFeatures.paginate(pagination);
    const objResponse = await this.repository.getCars(finalObject, pageConfig);

    if (objResponse.length === 0){
      const message = "There are no users";
      return message;
    }

    return objResponse;
  }

  async executeGetCarById(id: string): Promise<HydratedDocument<ICar>>{

    const car = await this.repository.getCarById(id);

    if (!car){
      throw new AppError("Car not found", 404);
    }

    return car;

  }

  async executeRegister(body: IRequestToRegister): Promise<HydratedDocument<ICar>> {

    const car = await this.repository.registerCar(body);

    return car;
  }

  async executeUpdateCar(body: object): Promise<HydratedDocument<ICar>>{

    const car = await this.repository.updateCar(body as IUpdateCarDTO);

    if (!car){
      throw new AppError("Car not found", 404);
    }

    return car;
  }

  async executeUpdateAcessories(id: string, accessoryId: string, newAccessory: string): Promise<object>{

    const updatedAccessory = await this.repository.updateAccessory(id, accessoryId, newAccessory);

    if (!updatedAccessory){
      throw new AppError("Car not found", 404);
    }

    return updatedAccessory;
  }

  async executeDeleteCar(id: string): Promise<void>{

    const deleteCount: number = await this.repository.deleteCar(id);

    if (!deleteCount){
      throw new AppError("Car not found", 404);
    }
    
    return;
  }
}