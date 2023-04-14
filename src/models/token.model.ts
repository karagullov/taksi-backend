import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
  driver: { type: Schema.Types.ObjectId, ref: "Driver" },
  refreshToken: { type: String, required: true },
});

export const TokenModel = model("Token", TokenSchema);
