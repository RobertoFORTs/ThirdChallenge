import { Request, Response } from "express";
import { ICarController } from "./ICarController";
import { CarService } from "../../services/CarService";
import { CarRepository } from "../../repositories/carRepository/CarRepository";
import { Car } from "../../models/carModel/Car";

const carRepository = new CarRepository(Car);
const carService = new CarService(carRepository);

export class CarController implements ICarController{
  getCars(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getCarById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  
  async registerCar(req: Request, res: Response): Promise<Response> {

    const newCar = await carService.executeRegister(req.body);

    return res.status(201).json({
      status: "success",
      message: "Car succesfully created",
      data: {
        newCar
      }
    });

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