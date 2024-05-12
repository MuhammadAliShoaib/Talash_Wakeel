import mongoose from "mongoose";
const { model, Schema } = mongoose;

const lawyerSchema = new Schema({
  lawyerBarCouncilId: { type: Number, required: true },
  firmBarCouncilId: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  field: { type: String, required: true },
  isDeleted: Boolean,
});

export const Lawyer = model("Lawyer", lawyerSchema);
