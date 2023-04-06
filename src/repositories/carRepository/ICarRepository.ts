import { HydratedDocument } from "mongoose"
import { ICar } from "../../models/carModel/ICar"
import { ICreateCarDTO } from "../../dto/CreateCarDTO"

export interface ICarRepository {
  getCars(queryObj: object, pagesConfig: number[]) : Promise<object[]>,
  getCarById() : Promise<HydratedDocument<ICar>>,
  registerCar(body: ICreateCarDTO) : Promise<HydratedDocument<ICar>>,
  updateCar() : Promise<HydratedDocument<ICar>>,
  updateAccessory() : Promise<HydratedDocument<ICar>>,
  deleteCar() : Promise<void>
}