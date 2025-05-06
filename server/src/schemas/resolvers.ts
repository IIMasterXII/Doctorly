import { Patient, Doctor, Appointment } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// This file contains the resolvers for the GraphQL schema.
// The resolvers are functions that are responsible for returning the data for the fields in the schema.
interface Patient {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  specialty: string;
}

// The Patient interface represents the structure of a patient object in the database.
interface PatientArgs {
  patientId: string;
}
// The PatientArgs interface represents the arguments that are passed to the patient query.
// It contains the patientId argument, which is used to identify the patient in the database.
// The PatientArgs interface is used in the patient query resolver to get the patientId from the arguments.
interface AddPatientArgs {
  input: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
  }
}

interface CreateAppointmentArgs {
  input: {
    doctorId: string;
    patientId: string;
    diagnosis: string;
  }
}

interface GetDiagnosisArgs {
  symptoms: string;
}

interface DoctorSpecArgs {
  specialty: string;
}

interface Context {
  user?: Patient;
}
// The Context interface represents the context object that is passed to the resolvers.
// It contains the user object, which is used to identify the currently logged-in user.
// The Context interface is used in the me and removePatient resolvers to get the user object from the context.
const resolvers = {
  Query: {
    doctorsBySpecialty: async (_parent: any, { specialty }: DoctorSpecArgs): Promise<Doctor[]> => {
      // Normalize to lowercase for case-insensitive match
      return await Doctor.find({ specialty: specialty });
    },
    getPatients: async (): Promise<Patient[]> => {
      return await Patient.find();
    },
    getPatient: async (_parent: any, { patientId }: PatientArgs): Promise<Patient | null> => {
      return await Patient.findOne({ _id: patientId });
    },
    getAppointmentsByPatient: async (_parent: any, { patientId }: PatientArgs) => {
      return Appointment.find({ patient: patientId }).populate("doctor").populate("patient");
    }
  },
  Mutation: {
    addPatient: async (_parent: any, { input }: AddPatientArgs): Promise<{ token: string; patient: Patient }> => {
      console.log(input)
      const existing = await Patient.findOne({ username: input.username });
      if (existing) throw new Error("Username already exists");
      const patient = await Patient.create({ ...input });
      const token = signToken(patient.username, patient.password, patient._id);
      return { token, patient };
    },
    createAppointment: async (_parent: any, { input }: CreateAppointmentArgs) => {
      const { patientId, doctorId, diagnosis } = input;
      const patient = await Patient.findById(patientId);
      const doctor = await Doctor.findById(doctorId);
      if (!patient || !doctor) throw new Error("Invalid patient or doctor");

      const appointment = await Appointment.create({ patient: patientId, doctor: doctorId, diagnosis: diagnosis });
      return (await appointment.populate("doctor")).populate("patient");
    },
    login: async (_parent: any, { username, password }: { username: string; password: string }): Promise<{ token: string; patient: Patient }> => {
      const patient = await Patient.findOne({ username });
      if (!patient) {
        throw AuthenticationError;
      }
      const correctPw = await patient.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(patient.username, patient.password, patient._id);
      return { token, patient };
    },
    removePatient: async (_parent: any, _args: any, context: Context): Promise<Patient | null> => {
      if (context.user) {
        return await Patient.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    getDiagnosis: async (_parent: any, { symptoms }: GetDiagnosisArgs): Promise<{ diagnosis: string; specialist: string }> => {
      const prompt = `
The user reports the following symptoms: "${symptoms}".

Based on common conditions, return:
1. A brief differential diagnosis summary.
2. The type of medical specialist the user should see.

Return ONLY a JSON object in the following format:
{
  "diagnosis": "string",
  "specialist": "string" // one word only, e.g., "cardiologist", "neurologist", etc.
}
Make sure the specialist value is a single capitalized word that matches a medical specialty.
`;


      try {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        });
        
        const content = chatCompletion.choices[0].message.content;
        const parsed = JSON.parse(String(content));

        return {
          diagnosis: parsed.diagnosis,
          specialist: parsed.specialist
        };
      } catch (err) {
        console.error("OpenAI error:", err);
        throw new Error("Failed to get diagnosis.");
      }
    }
  },
};

export default resolvers;
