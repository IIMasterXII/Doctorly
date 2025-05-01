import React, { useState } from 'react';

interface Doctor {
  name: string;
  specialty: string;
}

const Doctor: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor>({
    name: '',
    specialty: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({ ...prevDoctor, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted doctor:', doctor);
  };

  return (
    <div className="doctor-form-container">
      <h2>Doctor Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={doctor.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="specialty"
            placeholder="Specialty"
            value={doctor.specialty}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Doctor;