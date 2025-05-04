import React, { useState } from "react";

interface Doctor {
  name: string;
  specialty: string;
}

const Doctor: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor>({
    name: "",
    specialty: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({ ...prevDoctor, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted doctor:", doctor);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Doctor Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={doctor.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="specialty"
            className="form-control"
            placeholder="Specialty"
            value={doctor.specialty}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
};

export default Doctor;
