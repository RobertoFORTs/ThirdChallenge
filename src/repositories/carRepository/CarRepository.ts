import { HydratedDocument, Model } from "mongoose";
import { ICar } from "../../models/carModel/ICar";
import { ICarRepository } from "./ICarRepository";
import { ICreateCarDTO } from "../../dto/CreateCarDTO";

export class CarRepository implements ICarRepository{

  constructor (private repository: Model<ICar>){
    this.repository = repository;
  }

  async getCars(queryObj: object, pageConfig: number[]): Promise<object[]>{
    
    const objResponse = await this.repository.find(queryObj).skip(pageConfig[0]).limit(pageConfig[1]);

    return objResponse;
  }
  getCarById(): Promise<HydratedDocument<ICar>>{
    throw new Error("Method not implemented.");
  }
  async registerCar({ model, color, year, value_per_day, accessories, number_of_passengers }: ICreateCarDTO): Promise<HydratedDocument<ICar>>{
    
    const car = await this.repository.create({
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers
    })
    
    return car;
  }
  updateCar(): Promise<HydratedDocument<ICar>>{
    throw new Error("Method not implemented.");
  }
  updateAccessory(): Promise<HydratedDocument<ICar>>{
    throw new Error("Method not implemented.");
  }
  deleteCar(): Promise<void> {
    throw new Error("Method not implemented.");
  }

}