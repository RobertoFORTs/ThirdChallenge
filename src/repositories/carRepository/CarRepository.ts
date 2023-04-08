import { HydratedDocument, Model } from "mongoose";
import { ICar } from "../../models/carModel/ICar";
import { ICarRepository } from "./ICarRepository";
import { ICreateCarDTO } from "../../dto/CreateCarDTO";
import { IUpdateCarDTO } from "../../dto/UpdateCarDTO";
import { IUpdateAccessoryDTO } from "../../dto/UpdateAccessoryDTO";

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

  async updateCar({ id, model, color, year, value_per_day, accessories, number_of_passengers }: IUpdateCarDTO ): Promise<HydratedDocument<ICar> | null>{
    
    const updatedCar = await this.repository.findByIdAndUpdate(id, {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers
    }, {new: true});
  
    return updatedCar;

  }

  async updateAccessory(id: string, accessoryId: string, accessory: IUpdateAccessoryDTO): Promise<HydratedDocument<ICar> | null> {

    const {newAccessory} = accessory;
    const objQuery = await this.repository.findOneAndUpdate({ _id: id, accessories: { $elemMatch: { description: newAccessory.description }}}, {$pull: { accessories: { description: newAccessory.description }}}, {new: true});
    
    if (objQuery){
      return objQuery;
    }
    const updatedAccessory =  await this.repository.findByIdAndUpdate({_id: id}, {$push: {"accessories": newAccessory}}, {new: true});

    return updatedAccessory;
  }
  async deleteCar(id: string): Promise<number> {
    
    const { deletedCount } = await this.repository.deleteOne({ _id: id });

    return deletedCount;
  }
}