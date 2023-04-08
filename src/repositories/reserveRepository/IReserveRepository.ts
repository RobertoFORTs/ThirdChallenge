import { HydratedDocument } from "mongoose";
import { ICreateReserveDTO } from "../../dto/CreateReserveDTO";
import { IUpdateReserveDTO } from "../../dto/UpdateReserveDTO";
import { IReserve } from "../../models/reserveModel/IReserve";

export interface IReserveRepository{

  getReserves(queryObj: object, pagesConfig: number[]): Promise<object[]>,
  getReserveById(id: string): Promise<HydratedDocument<IReserve> | null>,
  registerReserve(body: ICreateReserveDTO): Promise<HydratedDocument<IReserve>>,
  updateReserve(body: IUpdateReserveDTO): Promise<HydratedDocument<IReserve> | null>,
  deleteReserve(id: string): Promise<number>,
  findIfOverlaps(start: Date, end: Date, userId: string): Promise<number>
  findIfCarIsAvailable(start: Date, end: Date, carId: string): Promise<number>
}