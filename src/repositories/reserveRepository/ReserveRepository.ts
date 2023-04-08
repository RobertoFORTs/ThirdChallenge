import { HydratedDocument, Model } from "mongoose";
import { ICreateReserveDTO } from "../../dto/CreateReserveDTO";
import { IUpdateReserveDTO } from "../../dto/UpdateReserveDTO";
import { IReserve } from "../../models/reserveModel/IReserve";
import { IReserveRepository } from "./IReserveRepository";


export class ReserveRepository implements IReserveRepository{

  constructor(private repository : Model<IReserve>) {
    this.repository = repository;
  }

  async getReserves(queryObj: object, pageConfig: number[]): Promise<HydratedDocument<IReserve>[]> {
    
    const totalNumOfDoc = await this.repository.find().countDocuments();
    const objResponse = await this.repository.find(queryObj).skip(pageConfig[0]).limit(pageConfig[1]);
    
    const numberOfDoc = {
      total: totalNumOfDoc
    }
    objResponse.push(numberOfDoc);

    return objResponse;

  }
  async getReserveById(id: string): Promise<HydratedDocument<IReserve> | null> {
    const reserve = await this.repository.findById(id);

    return reserve;

  }
  async registerReserve({ start_date, end_date, id_car, final_value, id_user }: ICreateReserveDTO): Promise<HydratedDocument<IReserve>> {

    const reserve = await this.repository.create({
      start_date,
      id_user,
      end_date,
      id_car,
      final_value, 
    })
    
    return reserve;

  }
  async updateReserve({id_reserve, id_user, start_date, end_date, id_car, final_value }: IUpdateReserveDTO): Promise<HydratedDocument<IReserve> | null> {
    
    const updatedReserve = await this.repository.findByIdAndUpdate(id_reserve, {
      id_user,
      start_date,
      end_date,
      id_car,
      final_value
    }, {new: true});
  
    return updatedReserve;

  }
  async deleteReserve(id: string): Promise<number> {
  
    const { deletedCount } = await this.repository.deleteOne({ _id: id });

    return deletedCount;

  }

  async findIfOverlaps(startDate: Date, endDate: Date, userId: string): Promise<number>{

    const overlapping = await this.repository.find({
      $and: [
        { id_user: { $eq: userId}},
        { $or: [
          { start_date: {$gte: startDate, $lte: endDate} },
          { end_date: {$gte: startDate, $lte: endDate} }
        ]}
      ]
    });

    return overlapping.length;

  }

  async findIfCarIsAvailable(startDate: Date, endDate: Date, carId: string): Promise<number> {

    const overlap = await this.repository.find({
      $and: [
        { id_car: { $eq: carId }},
        { $or: [
          { start_date: {$gte: startDate, $lte: endDate} },
          { end_date: {$gte: startDate, $lte: endDate} }
        ]}
      ]
    });

    return overlap.length;
    
  }
  
}