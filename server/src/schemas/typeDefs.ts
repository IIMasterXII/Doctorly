const typeDefs = `
  type Patient {
    _id: ID!
    name: String!
    age: Int!
    gender: String!
    symptoms: String!
    password: String!
    isCorrectPassword(password: String!): Boolean!
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
    removePatient: Patient
  }
`;

export default typeDefs;
