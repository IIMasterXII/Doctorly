import { Schema, model } from 'mongoose';
// Define the schema for the Profile document
const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
const Doctor = model('Doctor', doctorSchema);
export default Doctor;
