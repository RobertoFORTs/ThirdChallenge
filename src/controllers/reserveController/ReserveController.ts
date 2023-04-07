import { ReserveRepository } from "../../repositories/reserveRepository/ReserveRepository";
import { ReserveService } from "../../services/ReserveService";
import { IReserveController } from "./IReserveController";
import { Request, Response } from "express";

interface IRequest extends Request {
  user: {
    _id: string;
  }
}

const reserveRepository = new ReserveRepository();
const reserveService = new ReserveService(reserveRepository);

export class ReserveController implements IReserveController{
  
  
  async getReserves(req: Request, res: Response): Promise<Response> {
    
    const queryObj = req.query;
    const pagination = {
      page: req.query.page,
      limit: req.query.limit
    };
  
    const objResponse: object[] | string = await reserveService.executeGetReserves(queryObj, pagination);

    return res.status(200).json({
      status: "success",
      data: {
        objResponse
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
    
    Object.assign(req.body, req.user._id);

    const newReserve = await reserveService.executeRegister(req.body);

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