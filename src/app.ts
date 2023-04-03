import express, { Request, Response , NextFunction } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config({path: "./config.env"});

const app = express();

app.use(express.json());

const DB = process.env.DATABASE!.replace("<PASSWORD>", process.env.DATABASE_PASSWORD!);
connect(DB)
  .then(()=>{
    console.log("Database connection succesfull!");
  })
  .catch((err)=>{
    console.log("Could not connect to database!");
  });

export { app };


