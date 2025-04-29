import { Schema, model, Document } from 'mongoose';


interface IAppointment extends Document {
    patient_id: number;
    appointment_id: number;
    patientname: string;
    doctorname: string;
    date: Date;

}


const appointmentSchema = new Schema<IAppointment>(
  {
    patient_id: {
      type: Number,
      required: true,
    },
    appointment_id: {
      type: Number,
      required: true,
    },
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


const Appointment = model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
