import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';


interface IPatient extends Document {
    _id: string;
    name: string;
    age: number;
    gender: string;
    symptoms:string;
    password: string;
    isCorrectPassword(password: string): Promise<boolean>;
 
}


const patientSchema = new Schema<IPatient>(
  {
    _id: {
      type: String,
      required: true,
    },
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

    },
    password: {
      type: String,
      required: true,
      minlength: 20,
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

patientSchema.pre<IPatient>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


patientSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const Patient = model<IPatient>('Patient', patientSchema);

export default Patient;
