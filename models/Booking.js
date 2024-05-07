import mongoose from "mongoose";
const { model, Schema } = mongoose;

const bookingSchema = new Schema({
  firmBarCouncilId: { type: Number, required: true },
  lawyerBarCouncilId: { type: Number, required: true },
  lawyerName: String,
  clientID: { type: Number, required: true },
  clientName: String,
  bookingDate: Date,
});

export const Booking = model("Booking", bookingSchema);
