import express from "express";
import { ReserveController } from "../../controllers/reserveController/ReserveController";
import { SessionController } from "../../controllers/sessionController/SessionController";
import { idValidator } from "../../validators/idValidator";
import { reserveDataValidator } from "../../validators/reserveValidators/reserveDataValidator";

const reserveRouter = express.Router();
const reserveController = new ReserveController();

reserveRouter.use(SessionController.authGrantAccess);

reserveRouter.get("/", reserveController.getReserves);
reserveRouter.get("/:id", idValidator, reserveController.getReserveById);
reserveRouter.post("/register", reserveDataValidator, reserveController.registerReserve);
reserveRouter.put("/update/:id", idValidator, reserveDataValidator, reserveController.updateReserve);
reserveRouter.delete("/delete/:id", idValidator, reserveController.deleteReserve);

export {reserveRouter};
