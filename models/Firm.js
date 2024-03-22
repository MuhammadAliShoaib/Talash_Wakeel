import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const firmSchema = new Schema({
    firmID: String,
    firmName: String,
    firmEmail: String,
    firmPhoneNumber: String,
    firmAddress: String,
    firmCity: String,
    firmPassword: String,
})

export const Firm = model('Firm', firmSchema);