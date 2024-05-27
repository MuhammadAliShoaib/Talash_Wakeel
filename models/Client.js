import mongoose from "mongoose";
const { model, Schema } = mongoose;

const clientSchema = new Schema({
  clientID: { type: Number, required: true },
  clientFirstName: { type: String, required: true },
  clientLastName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientPhoneNumber: { type: String, required: true },
  clientCity: { type: String, required: true },
  clientPassword: { type: String, required: true },
  profileUrl: String,
  isDeleted: Boolean,
  refreshToken: String,
});

export const Client = model("Client", clientSchema);
