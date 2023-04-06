import { Request, Response } from "express";
import { ICarController } from "./ICarController";


export class CarController implements ICarController{
  getCars(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getCarById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  registerCar(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  updateCar(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  updateAccessory(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  deleteCar(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

}