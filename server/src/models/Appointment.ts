import { Schema, model, Document } from 'mongoose';

// This is the interface for the Appointment model
interface IAppointment extends Document {
    _id: string;
    patient: Schema.Types.ObjectId;
    doctor: Schema.Types.ObjectId;
    diagnosis: string;
    createdAt: Date;
}

// This is the schema for the Appointment model
// It defines the structure of the data in the database
// and the types of each field
// It also defines the validation rules for each field
// and the default values for each field
// It also defines the indexes for each field
// It also defines the timestamps for each field
// It also defines the virtuals for each field
// It also defines the methods for each field
const appointmentSchema = new Schema<IAppointment>(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    diagnosis: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
   
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// This is the model for the Appointment schema
// It defines the name of the model and the schema to use
// It also defines the collection name to use
const Appointment = model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
