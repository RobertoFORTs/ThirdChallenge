import { Request, Response } from "express";

export interface IUserController {
  registerUser(req: Request, res: Response): Promise<void>,
  getUsers(req: Request, res: Response): Promise<void>,
  getUserById(req: Request, res: Response): Promise<void>,
  updateUser(req: Request, res: Response): Promise<void>,
  deleteUser(req: Request, res: Response): Promise<void>
}