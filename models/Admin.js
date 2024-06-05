import mongoose from "mongoose";
const { model, Schema } = mongoose;

const adminSchema = new Schema({
  adminName: { type: String, required: true },
  adminEmail: { type: String, required: true },
  adminPassword: { type: String, required: true },
  refreshToken: String,
});

export const Admin = model("Admin", adminSchema);
