import { Request, Response } from "express"

export interface ISessionController {
  login(req: Request, res: Response): Promise<Response>
}