import express from "express";
import { userRouter } from "./userRoutes/userRoute";

const router = express.Router();

const baseRoute = "/api/v1";

router.use(`${baseRoute}/user`, userRouter);

export { router };