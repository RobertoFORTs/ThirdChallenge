import express from "express";
import { SessionController } from "../../controllers/sessionController/SessionController";

const sessionRouter = express.Router();

const sessioncontroller = new SessionController();

sessionRouter.post("/", sessioncontroller.login);

export {sessionRouter};