import mongoose from "mongoose";
const { model, Schema } = mongoose;

const lawyerSchema = new Schema({
  lawyerCouncilId: { type: Number, required: true },
  firmCouncilId: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  field: { type: String, required: true },
  refreshToken: String,
  isDeleted: Boolean,
});

export const Lawyer = model("Lawyer", lawyerSchema);
