import express from "express";
import { idValidator } from "../../validators/idValidator";
import { SessionController } from "../../controllers/sessionController/SessionController";
import { CarController } from "../../controllers/carController/CarController";
import { carInfoValidator } from "../../validators/carValidators/carInfoValidator"


const carRouter = express.Router();
const carController = new CarController();

carRouter.use(SessionController.authGrantAccess);


carRouter.get("/", carController.getCars);
carRouter.get("/:id", idValidator, carController.getCarById);
carRouter.post("/register", carInfoValidator, carController.registerCar);
carRouter.put("/update/:id", idValidator, carInfoValidator,carController.updateCar);
carRouter.put("/update/:id/accessories/:_id", idValidator, carController.updateAccessory);
carRouter.delete("/delete/:id", idValidator, carController.deleteCar);

export {carRouter};