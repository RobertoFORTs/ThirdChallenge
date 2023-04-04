import express, { Request, Response , NextFunction } from "express";
import dotenv from "dotenv";
import "express-async-errors";
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


app.use((err : AppError | any, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AppError){
    return res.status(err.statusCode).json(err.message);
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

export { app };


