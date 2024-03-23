import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const clientSchema = new Schema({
  clientID: Number,
  clientFirstName: String,
  clientLastName: String,
  clientEmail: String,
  clientPhoneNumber: String,
  clientCity: String,
  clientPassword: String,
  isDeleted: Boolean,
})

export const Client = model('Client', clientSchema);