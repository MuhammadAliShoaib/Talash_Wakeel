import mongoose from "mongoose";
const { model, Schema } = mongoose;

const bookingSchema = new Schema({
  appointmentId: { type: String, required: true },
  firmBarCouncilId: { type: Number, required: true },
  lawyerBarCouncilId: { type: Number, required: true },
  lawyerName: { type: String, required: true },
  clientID: { type: Number, required: true },
  clientName: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  status: { type: String, required: true },
  mode: { type: String, required: true },
});

export const Booking = model("Booking", bookingSchema);
