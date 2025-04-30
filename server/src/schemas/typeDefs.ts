const typeDefs = `
  type Patient {
   _id: String
    name: String
    age: Int
    gender: String
    symptoms: String
    password: String
  }

  type Auth {
    token: ID!
    patient: Patient
  }

  input PatientInput {
    name: String!
    age: Int!
    password: String!
  }

  type Query {
    patients: [Patient]!
    patient(patientId: ID!): Patient
    me: Patient
  }

  type Mutation {
    addPatient(input: PatientInput!): Auth
    login(name: String!, age: Int!, password: String!): Auth
<<<<<<< HEAD
=======

>>>>>>> d4ddfda579411186cf9864c520a960ef68fea98a
    removePatient: Patient
  }
`;

export default typeDefs;
