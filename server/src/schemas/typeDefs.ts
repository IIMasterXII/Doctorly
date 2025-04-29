const typeDefs = `
  type Patient {
   _id: string;
    name: string;
    age: number;
    gender: string;
    symptoms:string;
    password: string;
    isCorrectPassword(password: string): Promise<boolean>;
}
  }

  type Auth {
    token: ID!
    patient: Patient
  }
  
  input PatientInput {
    name: String!
    age: Number!
    password: String!
  }

  type Query {
    patients: [Patient]!
    patient(patientId: ID!): Patient
    me: Patient
  }

  type Mutation {
    addPatient(input: PatientInput!): Auth
    login(name: String!, age: Number!, password: String!): Auth

    removePatient: Patient
  }
`;

export default typeDefs;
