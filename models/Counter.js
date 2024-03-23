import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const counterSchema = new Schema({
  _id: String,
  seq: Number,
})

export const Counter = model('Counter', counterSchema);