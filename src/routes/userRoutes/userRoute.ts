import express from "express";
import { UserController } from "../../controllers/userController/UserController";
import { registerUserValidator } from "../../validators/userValidators/registerUserValidator";
import { idValidator } from "../../validators/idValidator";
import { updateUserValidator } from "../../validators/userValidators/updateUserValidator";
import { SessionController } from "../../controllers/sessionController/SessionController";


const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/register", registerUserValidator, userController.registerUser);

userRouter.use(SessionController.authGrantAccess);

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", idValidator, userController.getUserById);
userRouter.put("/update/:id", idValidator, updateUserValidator, userController.updateUser);
userRouter.delete("/delete/:id", idValidator, userController.deleteUser);

export {userRouter};
