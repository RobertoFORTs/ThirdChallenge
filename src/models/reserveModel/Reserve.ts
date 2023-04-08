import mongoose, { Schema, model } from "mongoose";
import { IReserve } from "./IReserve";

const reserveSchema = new Schema<IReserve>({
  
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  id_car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car"
  },
  final_value: {
    type: Number
  }
});

const Reserve = model<IReserve>("Reserve", reserveSchema);

export { Reserve };