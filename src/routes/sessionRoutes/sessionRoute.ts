import express from "express";
import { SessionController } from "../../controllers/sessionController/SessionController";
import { logInValidator } from "../../validators/sessionValidator/loginValidator";

const sessionRouter = express.Router();

const sessioncontroller = new SessionController();

sessionRouter.post("/", logInValidator, sessioncontroller.login);

export {sessionRouter};