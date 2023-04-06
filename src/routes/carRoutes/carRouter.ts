import express from "express";
import { registerUserValidator } from "../../validators/userValidators/registerUserValidator";
import { idValidator } from "../../validators/idValidator";
import { SessionController } from "../../controllers/sessionController/SessionController";
import { CarController } from "../../controllers/carController/CarController";


const carRouter = express.Router();
const carController = new CarController();

carRouter.use(SessionController.authGrantAccess);


carRouter.get("/", carController.getCars);
carRouter.get("/:id", idValidator, carController.getCarById);
carRouter.post("/register", registerUserValidator, carController.registerCar);
carRouter.put("/update/:id", idValidator, carController.updateCar);
carRouter.put("/update/accessory/:id", idValidator, carController.updateAccessory);
carRouter.delete("/delete/:id", idValidator, carController.deleteCar);

export {carRouter};