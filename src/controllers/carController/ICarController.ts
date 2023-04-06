import { Request, Response } from "express"

export interface ICarController {
  getCars(req: Request, res: Response) : Promise<Response>
  getCarById(req: Request, res: Response) : Promise<Response>
  registerCar(req: Request, res: Response) : Promise<Response>
  updateCar(req: Request, res: Response) : Promise<Response>
  updateAccessory(req: Request, res: Response) : Promise<Response>
  deleteCar(req: Request, res: Response) : Promise<Response>
}