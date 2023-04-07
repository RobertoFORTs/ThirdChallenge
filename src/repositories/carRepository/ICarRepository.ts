import { HydratedDocument } from "mongoose"
import { ICar } from "../../models/carModel/ICar"
import { ICreateCarDTO } from "../../dto/CreateCarDTO"
import { IUpdateCarDTO } from "../../dto/UpdateCarDTO"

export interface ICarRepository {
  getCars(queryObj: object, pagesConfig: number[]) : Promise<object[]>,
  getCarById(id: string) : Promise<HydratedDocument<ICar> | null>,
  registerCar(body: ICreateCarDTO) : Promise<HydratedDocument<ICar>>,
  updateCar(body: IUpdateCarDTO) : Promise<HydratedDocument<ICar> | null>,
  updateAccessory(id: string, accessoryId: string, newAccessory: string) : Promise<HydratedDocument<ICar> | null>,
  deleteCar(id: string) : Promise<number>
}