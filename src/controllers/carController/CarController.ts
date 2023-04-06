import { Request, Response } from "express";
import { ICarController } from "./ICarController";
import { CarService } from "../../services/CarService";
import { CarRepository } from "../../repositories/carRepository/CarRepository";
import { Car } from "../../models/carModel/Car";

const carRepository = new CarRepository(Car);
const carService = new CarService(carRepository);

export class CarController implements ICarController{
  async getCars(req: Request, res: Response): Promise<Response> {
    
    const queryObj = req.query;
    const pagination = {
      page: req.query.page,
      limit: req.query.limit
    };
  
    const objResponse: object[] | string = await carService.executeGetCars(queryObj, pagination);

    return res.status(200).json({
      status: "success",
      data: {
        objResponse
      }
    });

  }
  async getCarById(req: Request, res: Response): Promise<Response> {
    
    const id = req.params.id;

    const user = await carService.executeGetCarById(id);

    return res.status(200).json({
      status: "success",
      message: "User found",
      data: {
        user
      }
    });
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
  async deleteCar(req: Request, res: Response): Promise<Response> {
    
    const id = req.params.id;

    await carService.executeDeleteCarByID(id);

    return res.status(204).send();
  }

}