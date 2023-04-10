import { HydratedDocument } from "mongoose";
import { Reserve } from "../../models/reserveModel/Reserve";
import { ReserveRepository } from "../../repositories/reserveRepository/ReserveRepository";
import { ReserveService } from "../../services/ReserveService";
import { IReserveController } from "./IReserveController";
import { Request, Response } from "express";
import { IReserve } from "../../models/reserveModel/IReserve";

interface IRequest extends Request {
  user: {
    _id: string;
  }
}

const reserveRepository = new ReserveRepository(Reserve);
const reserveService = new ReserveService(reserveRepository);

export class ReserveController implements IReserveController{
  
  
  async getReserves(req: Request, res: Response): Promise<Response> {
    
    const queryObj = req.query;
    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 100
    };
  
    const objResponse: HydratedDocument<IReserve>[] = await reserveService.executeGetReserves(queryObj, pagination);
    const totalObject = objResponse[objResponse.length-1];
    const total = Object.values(totalObject)[0];

    objResponse.pop();
    
    let newLimit = 0;
    if (pagination.limit === req.query.limit){
    newLimit = ((parseInt(req.query.limit.toString())));
    }
    const numberOfPages =  (newLimit)? total/newLimit : total/(+pagination.limit);
    const offsets =  numberOfPages < 1 ?  1 : Math.ceil(numberOfPages);


    return res.status(200).json({
      status: "success",
      data: {
        objResponse,
        total: total,
        limit: +pagination.limit,
        offset: +pagination.page,
        offsets: offsets
      }
    });

  }
  async getReserveById(req: Request, res: Response): Promise<Response> {
    
    const id = req.params.id;

    const user = await reserveService.executeGetReserveById(id);

    return res.status(200).json({
      status: "success",
      message: "Reserve found",
      data: {
        user
      }
    });

  }
  async registerReserve(req: IRequest, res: Response): Promise<Response> {
    req.user._id = req.user._id.toString();
    const newReserve = await reserveService.executeRegister(req.body, req.user._id);

    return res.status(201).json({
      status: "success",
      message: "reserve succesfully created",
      data: {
        newReserve
      }
    });

  }
  async updateReserve(req: Request, res: Response): Promise<Response> {
    
    const objId = {
      id_reserve: req.params.id
    };
    Object.assign(req.body, objId);
    const updatedReserve = await reserveService.executeUpdateReserve(req.body);

    return res.status(200).json({
      status: "success",
      message: "reserve has been updated",
      data: {
        updatedReserve
      }
    });

  }
  async deleteReserve(req: Request, res: Response): Promise<Response> {

    const id = req.params.id;

    await reserveService.executeDeleteReserve(id);

    return res.status(204).send();

  }

}