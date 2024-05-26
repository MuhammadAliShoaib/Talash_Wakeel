import mongoose from "mongoose";
const { model, Schema } = mongoose;

const bookingSchema = new Schema({
  appointmentId: { type: String, required: true },
  firmCouncilId: { type: Number, required: true },
  lawyerCouncilId: { type: Number, required: true },
  clientID: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true },
  status: { type: String, required: true },
  mode: { type: String, required: true },
});

export const Booking = model("Booking", bookingSchema);
