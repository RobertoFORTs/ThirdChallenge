import { HydratedDocument } from "mongoose";
import { ICarRepository } from "../repositories/carRepository/ICarRepository";
import { ICar } from "../models/carModel/ICar";
import { QueryFeatures } from "../utils/QueryFeatures";

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


  async executeRegister(body: IRequestToRegister): Promise<HydratedDocument<ICar>> {

    const car = await this.repository.registerCar(body);

    return car;
  }

}