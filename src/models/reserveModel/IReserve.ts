import mongoose from "mongoose";

export interface IReserve{
  id_user: mongoose.Schema.Types.ObjectId,
  start_date: Date,
  end_date: Date,
  id_car: mongoose.Schema.Types.ObjectId,
  final_value: number
}