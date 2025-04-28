import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the Profile document
interface IAppointment extends Document {
    patientname: string;
    doctorname: string;
    date: Date;

}

// Define the schema for the Profile document
const appointmentSchema = new Schema<IAppointment>(
  {
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
   
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);


const Appointment = model<Appointment>('Appointment', appointmentSchema);

export default Appointment;
