import express from "express";
import { userRouter } from "./userRoutes/userRoute";
import { sessionRouter } from "./sessionRoutes/sessionRoute";
import { carRouter } from "./carRoutes/carRouter";
import { reserveRouter } from "./reserveRoutes/reserveRouter";

const router = express.Router();

const baseRoute = "/api/v1";

router.use(`${baseRoute}/user`, userRouter);
router.use(`${baseRoute}/authenticate`, sessionRouter);
router.use(`${baseRoute}/car`, carRouter);
router.use(`${baseRoute}/reserve`, reserveRouter);

export { router };