import { HydratedDocument } from "mongoose"
import { ICar } from "../../models/carModel/ICar"

export interface ICarRepository {
  getCars() : Promise<HydratedDocument<ICar>>,
  getCarById() : Promise<HydratedDocument<ICar>>,
  registerCar() : Promise<HydratedDocument<ICar>>,
  updateCar() : Promise<HydratedDocument<ICar>>,
  updateAccessory() : Promise<HydratedDocument<ICar>>,
  deleteCar() : Promise<void>
}