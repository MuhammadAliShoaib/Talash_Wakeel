import mongoose from "mongoose";
const { model, Schema } = mongoose;

const documentSchema = new Schema({
  ownerId: { type: String, required: true },
  title: { type: String, required: true },
  docURL: { type: String, required: true },
});

export const Document = model("Document", documentSchema);
