import mongoose from "mongoose";
const { model, Schema } = mongoose;

const firmSchema = new Schema({
  firmBarCouncilId: { type: Number, required: true },
  firmName: { type: String, required: true },
  firmEmail: { type: String, required: true },
  firmPhoneNumber: { type: String, required: true },
  firmCity: { type: String, required: true },
  firmPassword: { type: String, required: true },
  refreshToken: String,
});

export const Firm = model("Firm", firmSchema);
