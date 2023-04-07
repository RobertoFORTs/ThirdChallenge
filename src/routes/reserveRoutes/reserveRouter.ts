import express from "express";
import { ReserveController } from "../../controllers/reserveController/ReserveController";
import { SessionController } from "../../controllers/sessionController/SessionController";
import { idValidator } from "../../validators/idValidator";

const reserveRouter = express.Router();
const reserveController = new ReserveController();

reserveRouter.use(SessionController.authGrantAccess);


reserveRouter.get("/", reserveController.getReserves);
reserveRouter.get("/:id", idValidator, reserveController.getReserveById);
reserveRouter.post("/register", reserveController.registerReserve);
reserveRouter.put("/update/:id", idValidator, reserveController.updateReserve);
reserveRouter.delete("/delete/:id", idValidator, reserveController.deleteReserve);

export {reserveRouter};
