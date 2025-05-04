import { Patient } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// This file contains the resolvers for the GraphQL schema.
// The resolvers are functions that are responsible for returning the data for the fields in the schema.
interface Patient {
    _id: string;
    name: string;
    age: number;
    gender: string;
    symptoms:string;
    password: string;
    isCorrectPassword(password: string): Promise<boolean>;
}
// The Patient interface represents the structure of a patient object in the database.

interface PatientArgs {
  patientId: string;
}
// The PatientArgs interface represents the arguments that are passed to the patient query.
// It contains the patientId argument, which is used to identify the patient in the database.
// The PatientArgs interface is used in the patient query resolver to get the patientId from the arguments.
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
// The Context interface represents the context object that is passed to the resolvers.
// It contains the user object, which is used to identify the currently logged-in user.
// The Context interface is used in the me and removePatient resolvers to get the user object from the context.
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
      const token = signToken(patient.name, patient.password, patient._id);
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
      const token = signToken(patient.name, patient.password, patient._id);
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
