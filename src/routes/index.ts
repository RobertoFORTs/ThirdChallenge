import express from "express";
import { userRouter } from "./userRoutes/userRoute";
import { sessionRouter } from "./sessionRoutes/sessionRoute";

const router = express.Router();

const baseRoute = "/api/v1";

router.use(`${baseRoute}/user`, userRouter);
router.use(`${baseRoute}/authenticate`, sessionRouter);

export { router };