/* eslint-disable no-prototype-builtins */
import { HydratedDocument } from "mongoose";
import { AppError } from "../errors/AppError";
import { QueryFeatures } from "../utils/QueryFeatures";
import { IReserveRepository } from "../repositories/reserveRepository/IReserveRepository";
import { IReserve } from "../models/reserveModel/IReserve";
import { IUpdateReserveDTO } from "../dto/UpdateReserveDTO";
import { ICreateReserveDTO } from "../dto/CreateReserveDTO";

interface IRequestToRegister{
  user_id: string,
  start_date: Date,
  end_date: Date,
  id_car: string,
}

export class ReserveService {

  constructor(private repository: IReserveRepository){
    this.repository = repository;
  }


  async executeGetReserves(queryObj: object, pagination: object): Promise<object[] | string>{
    let finalObject: object = {};
    
    if (queryObj && !queryObj.hasOwnProperty("page") && !queryObj.hasOwnProperty("limit")){
      const queryString = QueryFeatures.filter(queryObj);
      finalObject = JSON.parse(queryString);
    }
    const pageConfig = QueryFeatures.paginate(pagination);
    const objResponse = await this.repository.getReserves(finalObject, pageConfig);

    if (objResponse.length === 0){
      const message = "There are no users";
      return message;
    }

    return objResponse;
  }

  async executeGetReserveById(id: string): Promise<HydratedDocument<IReserve>>{

    const reserve = await this.repository.getReserveById(id);

    if (!reserve){
      throw new AppError("Reserve not found", 404);
    }

    return reserve;

  }

  async executeRegister(body: IRequestToRegister): Promise<HydratedDocument<IReserve>> {

    const value = {
      final_value: 0
    };

    //calc final_value

    Object.assign(body, value);

    const reserve = await this.repository.registerReserve(body as ICreateReserveDTO);

    return reserve;
  }

  async executeUpdateReserve(body: object): Promise<HydratedDocument<IReserve>>{

    const value = {
      final_value: 0
    };

    //calc final_value

    Object.assign(body, value);

    const reserve = await this.repository.updateReserve(body as IUpdateReserveDTO);

    if (!reserve){
      throw new AppError("Reserve not found", 404);
    }

    return reserve;
  }

  async executeDeleteReserve(id: string): Promise<void>{

    const deleteCount: number = await this.repository.deleteReserve(id);

    if (!deleteCount){
      throw new AppError("Reserve not found", 404);
    }
    
    return;
  }

}