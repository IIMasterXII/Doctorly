import { useEffect, useState } from "react";

interface Patient {
  name: string;
  age: string;
  gender: string;
  symptoms: string;
}

const Patient = () => {
  const [patient, setPatient] = useState<Patient>({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("patients");
    if (stored) setPatients(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!patient.name || !patient.age || !patient.gender || !patient.symptoms) {
      alert("Please fill out all fields.");
      return;
    }

    const updatedPatients = [...patients, patient];
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setPatient({ name: "", age: "", gender: "", symptoms: "" });
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Patient Registration</h2>

      {submitted && (
        <div className="alert alert-success" role="alert">
          Patient registered successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={patient.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            name="age"
            value={patient.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Gender"
            name="gender"
            value={patient.gender}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Symptoms"
            name="symptoms"
            value={patient.symptoms}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Save Patient
        </button>
      </form>

      {patients.length > 0 && (
        <>
          <h3 className="mt-5">Registered Patients</h3>
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Symptoms</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, index) => (
                <tr key={index}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.symptoms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Patient;
