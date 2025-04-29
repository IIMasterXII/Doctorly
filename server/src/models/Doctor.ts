import { Schema, model, Document } from 'mongoose';


interface IDoctor extends Document {
    name: string;
    specialty: string;
}


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


const Doctor = model<IDoctor>('Doctor', doctorSchema);

export default Doctor;
