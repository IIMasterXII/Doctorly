import { Schema, model } from 'mongoose';
// Define the schema for the Profile document
const patientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    symptoms: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
const Patient = model('Patient', patientSchema);
export default Patient;
