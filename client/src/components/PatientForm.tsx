import React, { useState } from 'react';

interface Patient {
  name: string;
  age: number;
  gender: string;
  symptoms: string;
  condition: string;
}

const PatientForm: React.FC = () => {
  const [patient, setPatient] = useState<Patient>({
    name: '',
    age: 0,
    gender: '',
    symptoms: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted patient:', patient);
    // You can send this data to an API or store it
  };

  return (
    <div className="patient-form-container">
      <h2>Patient Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={patient.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={patient.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={patient.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="symptoms"
            placeholder="Symptoms"
            value={patient.symptoms}
            onChange={handleChange}
          />
        </div>
        <div>
        </div>
        <button type="submit">Save Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;
