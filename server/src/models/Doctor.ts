import { Schema, model, Document } from 'mongoose';

// Define the interface for the Doctor model
// This interface extends the Document interface from mongoose
interface IDoctor extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    specialty: string;
}

// Create a Mongoose schema for the Doctor model
// The schema defines the structure of the Doctor documents
// in the MongoDB database, including the types and validation rules
// for each field
const doctorSchema = new Schema<IDoctor>(
  {
    firstName: {
      type: String,
      required: true,  
    },
    lastName: {
      type: String,
      required: true,  
    },
    specialty: {
      type: String,
      required: true, 
    },
   
  }
);

// Create the Doctor model using the schema
const Doctor = model<IDoctor>('Doctor', doctorSchema);

export default Doctor;
