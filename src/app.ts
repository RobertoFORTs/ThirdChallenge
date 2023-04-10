import express, { Request, Response , NextFunction } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { ValidationError } from "joi";
import { connect } from "mongoose";
import { AppError } from "./errors/AppError";
import { router } from "./routes";


dotenv.config({path: "./config.env"});

const app = express();

app.use(express.json());


app.use(router);

const DB = process.env.DATABASE!.replace("<PASSWORD>", process.env.DATABASE_PASSWORD!);
connect(DB)
  .then(()=>{
    console.log("Database connection succesfull!");
  })
  .catch((err)=>{
    console.log("Could not connect to Database!");
  });


app.use((err : AppError | ValidationError | Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AppError){
    return res.status(err.statusCode).json(err.message);
  }
  
  if (err instanceof ValidationError){

    if (err.message.includes("\"")) {
      const newErrorMessage = err.message.split("\"");
      err.message = `${newErrorMessage[1]}${newErrorMessage[2]}`;
    }

    return res.status(400).json({message: err.message});
  }
  if (err.message.includes("E11000") || err.message.includes("E11000")){
    err.message = "Email or CPF already in use";
    return res.status(400).json({
      status: "error",
      message: err.message
    });
  }
  return res.status(500).json({
    status: "error",
    message: err.message
  });
});

export { app };


