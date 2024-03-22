import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const clientSchema = new Schema({
  clientFirstName: String,
  clientLastName: String,
  clientEmail: String,
  clientPassword: String,
  clientCity: String,
  clientPhoneNumber: String,
  isDeleted: Boolean,
})

export const Client = model('Client', clientSchema);