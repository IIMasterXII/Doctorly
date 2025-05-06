const typeDefs = `
  type Patient {
    _id: ID
    username: String!
    firstName: String!
    lastName: String!
    age: Int!
    gender: String!
  }

  input PatientInput {
    username: String!
    password: String!
    firstName: String!
    lastName: String!
    age: Int!
    gender: String!
  }

  type Appointment {
    id: ID!
    patient: Patient!
    doctor: Doctor!
    diagnosis: String!
    createdAt: String!
  }

  input AppointmentInput {
    patientId: ID!
    doctorId: ID!
    diagnosis: String!
  }

  type Doctor {
    _id: ID
    firstName: String!
    lastName: String!
    specialty: String!
  }

  type Auth {
    token: ID!
    patient: Patient
  }
  
  type DiagnosisResult {
    diagnosis: String!
    specialist: String!
  }

  type Query {
    doctorsBySpecialty(specialty: String!): [Doctor!]!
    getPatients: [Patient!]!
    getPatient(patientId: ID!): Patient
    getAppointmentsByPatient(patientId: ID!): [Appointment]
  }

  type Mutation {
    addPatient(input: PatientInput!): Auth
    createAppointment(input: AppointmentInput!): Appointment
    login(username: String!, password: String!): Auth
    removePatient: Patient
    getDiagnosis(symptoms: String!): DiagnosisResult!
  }
`;

export default typeDefs;
