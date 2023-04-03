import express, { Request, Response , NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config({path: "./config.env"});

const app = express();

app.use(express.json());

export { app };