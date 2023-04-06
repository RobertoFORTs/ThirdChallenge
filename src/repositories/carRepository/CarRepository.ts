import { HydratedDocument } from "mongoose";
import { ICar } from "../../models/carModel/ICar";
import { ICarRepository } from "./ICarRepository";

export class CarRepository implements ICarRepository{
  getCars(): Promise<HydratedDocument<ICar>>{
    throw new Error("Method not implemented.");
  }
  getCarById(): Promise<HydratedDocument<ICar>>{
    throw new Error("Method not implemented.");
  }
  registerCar(): Promise<HydratedDocument<ICar>>{
    throw new Error("Method not implemented.");
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