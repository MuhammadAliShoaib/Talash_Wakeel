import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const lawyerSchema = new Schema({
    barCouncilId: String,
    email: String,
    field: String,
    firmId: String,
    firstName: String,
    lastName: String,
    password: String,
    userType: String,
    isDeleted: Boolean,
})

export const Lawyer = model('Lawyer', lawyerSchema);
