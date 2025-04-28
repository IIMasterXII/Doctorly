import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the Profile document
interface IPatient extends Document {
    name: string;
    age: number;
    gender: string;
    symptoms:string;
 
}

// Define the schema for the Profile document
const patientSchema = new Schema<IPatient>(
  {
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
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);


const Patient = model<Patient>('Patient', patientSchema);

export default Patient;
