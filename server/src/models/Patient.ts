import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// This is the interface for the Patient model
// It defines the structure of the data that will be stored in the database
interface IPatient extends Document {
    _id: string;
    username: string;
    password: string;
    isCorrectPassword(password: string): Promise<boolean>;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
 
}

// This is the schema for the Patient model
// It defines the structure of the data that will be stored in the database
const patientSchema = new Schema<IPatient>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
    firstName: { 
      type: String, 
      required: true 
    },
    lastName: { 
      type: String, 
      required: true 
    },
    age: {
      type: Number,
      required: true,
    },
    gender: { 
      type: String, 
      enum: ["Male", "Female", "Other"],
      required: true,
    }
  },
);
// This pre-save hook is used to hash the password before saving it to the database
// It uses bcrypt to hash the password with a salt
// The salt rounds can be adjusted for security
patientSchema.pre<IPatient>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// This method is used to compare the password entered by the user with the hashed password stored in the database
// It uses bcrypt to compare the passwords
// It returns true if the passwords match, false otherwise
// This is used for authentication
patientSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
// This creates the Patient model using the schema defined above
// The model is used to interact with the database
const Patient = model<IPatient>('Patient', patientSchema);

// This exports the Patient model so it can be used in other parts of the application
export default Patient;
