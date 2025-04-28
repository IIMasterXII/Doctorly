import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the Profile document
interface IDoctor extends Document {
    name: string;
    specialty: string;
}

// Define the schema for the Profile document
const doctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,  
    },
    specialty: {
      type: String,
      required: true, 
    },
   
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);


const Doctor = model<Doctor>('Doctor', doctorSchema);

export default Doctor;
