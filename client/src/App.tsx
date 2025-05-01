import React from 'react';
import PatientForm from './components/PatientForm';
import Doctor from './components/Doctor'
import Appointment from './components/Appointment';


const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1><Doctorly</h1>

      <section className="form-section">
        <h2>Patient Form</h2>
        <PatientForm />
      </section>

      <section className="form-section">
        <h2>Doctor Profile</h2>
        <DoctorForm />
      </section>

      <section className="form-section">
        <h2>Book Appointment</h2>
        <Appointment/>
      </section>
    </div>
  );
};

export default App;
