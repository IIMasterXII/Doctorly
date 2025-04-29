import { Patient } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface Patient {
    _id: string;
    name: string;
    age: number;
    gender: string;
    symptoms:string;
    password: string;
    isCorrectPassword(password: string): Promise<boolean>;
}

interface PatientArgs {
  patientId: string;
}

interface AddPatientArgs {
  input:{
    name: string;
    age: number;
    gender: string;
    symptoms:string;
  }
}

interface Context {
  user?: Patient;
}

const resolvers = {
  Query: {
    patients: async (): Promise<Patient[]> => {
      return await Patient.find();
    },
    patient: async (_parent: any, { patientId }: PatientArgs): Promise<Patient | null> => {
      return await Patient.findOne({ _id: patientId });
    },
    me: async (_parent: any, _args: any, context: Context): Promise<Patient | null> => {
      if (context.user) {
        return await Patient.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addPatient: async (_parent: any, { input }: AddPatientArgs): Promise<{ token: string; patient: Patient }> => {
      const patient = await Patient.create({ ...input });
      const token = signToken(patient.name, patient.age, patient._id);
      return { token, patient };
    },
    login: async (_parent: any, { name, password }: { name: string; password: string }): Promise<{ token: string; patient: Patient }> => {
      const patient = await Patient.findOne({ name });
      if (!patient) {
        throw AuthenticationError;
      }
      const correctPw = await patient.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(patient.name, patient.email, patient._id);
      return { token, patient };
    },
    removePatient: async (_parent: any, _args: any, context: Context): Promise<Patient | null> => {
      if (context.user) {
        return await Patient.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;
