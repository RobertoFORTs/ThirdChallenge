import { HydratedDocument } from "mongoose";
import { ICarRepository } from "../repositories/carRepository/ICarRepository";
import { ICar } from "../models/carModel/ICar";

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

  async executeRegister(body: IRequestToRegister): Promise<HydratedDocument<ICar>> {

    const car = await this.repository.registerCar(body);

    return car;
  }

}