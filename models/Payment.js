import mongoose from "mongoose";
const { model, Schema } = mongoose;

const paymentSchema = new Schema({
  appointmentId: { type: String, required: true },
  firmCouncilId: { type: Number, required: true },
  lawyerCouncilId: { type: Number, required: true },
  clientID: { type: Number, required: true },
  pendingAmount: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
});

export const Payment = model("Payment", paymentSchema);
