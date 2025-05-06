import { gql } from '@apollo/client';

export const QUERY_PATIENTS = gql`
  query allPatients {
    getPatients {
      _id
      username
      firstName
      lastName
      age
      gender
    }
  }
`;

export const GET_APPOINTMENTS_BY_PATIENT = gql`
  query GetAppointmentsByPatient($patientId: ID!) {
    getAppointmentsByPatient(patientId: $patientId) {
      id
      createdAt
      diagnosis
      doctor {
        firstName
        lastName
        specialty
      }
    }
  }
`;

export const QUERY_SINGLE_PATIENT = gql`
  query singlePatient($patientId: ID!) {
    getPatient(patientId: $patientId) {
      _id
      username
      firstName
      lastName
      age
      gender
    }
  }
`;

export const QUERY_SPECIALIZED_DOCTOR = gql`
  query DoctorsBySpecialty($specialty: String!) {
    doctorsBySpecialty(specialty: $specialty) {
      _id
      firstName
      lastName
      specialty
    }
  }
`;
