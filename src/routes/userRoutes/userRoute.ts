import express from "express";
import { UserController } from "../../controllers/userController/UserController";
import { registerUserValidator } from "../../validators/userValidators/registerUserValidator";


const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/register', registerUserValidator, userController.registerUser);

export {userRouter};
