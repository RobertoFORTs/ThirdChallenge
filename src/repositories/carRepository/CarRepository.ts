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
  async getCarById(id: string): Promise<HydratedDocument<ICar> | null>{
    
    const car = await this.repository.findById(id);

    return car;

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
  async deleteCar(id: string): Promise<number> {
    
    const { deletedCount } = await this.repository.deleteOne({ _id: id });

    return deletedCount;
  }

}