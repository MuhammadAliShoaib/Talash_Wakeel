import mongoose from "mongoose";
const { model, Schema } = mongoose;

const lawyerSchema = new Schema({
  barCouncilId: String,
  firmCouncilId: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  field: String,
  // userType: String,
  isDeleted: Boolean,
});

export const Lawyer = model("Lawyer", lawyerSchema);
