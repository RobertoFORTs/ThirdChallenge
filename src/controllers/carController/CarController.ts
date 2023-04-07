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
      message: "Car found",
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

  async updateCar(req: Request, res: Response): Promise<Response> {
    const objId = {
      id: req.params.id
    };
    Object.assign(req.body, objId);
    const updatedCar = await carService.executeUpdateCar(req.body);

    return res.status(200).json({
      status: "success",
      message: "Car has been updated",
      data: {
        updatedCar
      }
    });
  }

  async updateAccessory(req: Request, res: Response): Promise<Response> {
    
    const {id, _id} = req.params;
    
    const updatedAcessory = await carService.executeUpdateAcessories(id, _id, req.body);

    return res.status(200).json({
      status: "success",
      message: "Updated with success!",
      data: {
        updatedAcessory
      }
    });
  }

  async deleteCar(req: Request, res: Response): Promise<Response> {
    
    const id = req.params.id;

    await carService.executeDeleteCar(id);

    return res.status(204).send();
  }

}