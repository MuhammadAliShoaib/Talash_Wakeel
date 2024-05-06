import mongoose from "mongoose";
const { model, Schema } = mongoose;

const bookingSchema = new Schema({
  firmId: Number,
  LawyerId: Number,
  clientId: Number,
  bookingDate: Date,
});

export const Booking = model("Booking", bookingSchema);
