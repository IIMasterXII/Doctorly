import { gql } from '@apollo/client';

export const ADD_PATIENT = gql`
  mutation addPatient($input: PatientInput!) {
    addPatient(input: $input) {
      token
      patient {
        _id
        username
        firstName
        lastName
        age
        gender
      }
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: AppointmentInput!) {
    createAppointment(input: $input) {
      id
      createdAt
      diagnosis
      doctor {
        firstName
        lastName
        specialty
      }
      patient {
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      patient {
        _id
        username
        firstName
        lastName
        age
        gender
      }
    }
  }
`;

export const GET_DIAGNOSIS = gql`
  mutation GetDiagnosis($symptoms: String!) {
    getDiagnosis(symptoms: $symptoms) {
      diagnosis
      specialist
    }
}
`