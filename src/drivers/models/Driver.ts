import { Schema, model } from "mongoose";

const driver = new Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  car: { type: String, required: true },
  route: { type: Object, required: true }, //route {from:'Osh', to:'Bishkek'}
  avatar: { type: String },
});

export const DriverModel = model("Driver", driver);
