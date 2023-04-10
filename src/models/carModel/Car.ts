import { Schema, model } from "mongoose";
import { ICar } from "./ICar";
import { string } from "joi";


const carSchema = new Schema<ICar>({
  model: {
    type: String
  },
  color: {
    type: String
  },
  year: {
    type: Date
  },
  value_per_day: {
    type: Number
  },
  accessories:[
    {
      description:{
        type: String
      }
    }
  ],
  number_of_passengers: {
    type: Number
  },
  __v: {
    type: Number,
    required: false,
    select: false
  }
}, {versionKey: false});

const Car = model<ICar>("Car", carSchema);

export { Car };