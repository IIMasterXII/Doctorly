import { Schema, model } from 'mongoose';
// Define the schema for the Profile document
const appointmentSchema = new Schema({
    patientname: {
        type: String,
        required: true,
    },
    doctorname: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
const Appointment = model('Appointment', appointmentSchema);
export default Appointment;
