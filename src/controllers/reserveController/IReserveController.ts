import { Request, Response } from "express";

export interface IReserveController {

  getReserves(req: Request, res: Response) : Promise<Response>,
  getReserveById(req: Request, res: Response) : Promise<Response>,
  registerReserve(req: Request, res: Response) : Promise<Response>,
  updateReserve(req: Request, res: Response) : Promise<Response>,
  deleteReserve(req: Request, res: Response) : Promise<Response>
}