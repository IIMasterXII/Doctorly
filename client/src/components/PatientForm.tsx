import { useEffect, useState } from "react";

interface Patient {
  name: string;
  age: string;
  gender: string;
  symptoms: string;
}

interface Doctor {
  name: string;
  specialty: string;
}

const symptomToSpecialty: Record<string, string> = {
  depression: "Psychiatrist",
  bloodclots: "Hematologist",
  headache: "Neurologist",
  arthritis: "Rheumatologist",
  heart: "Cardiologist",
  joint: "Orthopaedist",
  rash: "Dermatologist",
  stomach: "Gastroenterologist",
};

const PatientForm = () => {
  const [patient, setPatient] = useState<Patient>({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [suggestedDoctor, setSuggestedDoctor] = useState<string>("");
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Fetch doctor data from server API
  useEffect(() => {
    fetch("/api/doctors") // Make sure this route exists on your backend
      .then((res) => res.json())
      .then((data) => setDoctorData(data))
      .catch((err) => console.error("Failed to fetch doctor data:", err));
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("patients");
    if (stored) setPatients(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedPatient = { ...patient, [name]: value };
    setPatient(updatedPatient);

    if (name === "symptoms") {
      const keyword = Object.keys(symptomToSpecialty).find((key) =>
        value.toLowerCase().includes(key)
      );
      if (keyword) {
        const specialty = symptomToSpecialty[keyword];
        const matchedDoctor = doctorData.find((doc: Doctor) =>
          doc.specialty.toLowerCase().includes(specialty.toLowerCase())
        );
        setSuggestedDoctor(
          matchedDoctor ? `${matchedDoctor.name} (${matchedDoctor.specialty})` : "No doctor found"
        );
      } else {
        setSuggestedDoctor("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient.name || !patient.age || !patient.gender || !patient.symptoms) {
      alert("Please fill out all fields.");
      return;
    }

    const updatedPatients = [...patients, patient];
    setPatients(updatedPatients);
    sessionStorage.setItem("patients", JSON.stringify(updatedPatients));
    setPatient({ name: "", age: "", gender: "", symptoms: "" });
    setSuggestedDoctor("");
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

        {suggestedDoctor && (
          <div className="alert alert-info">
            Suggested Doctor: <strong>{suggestedDoctor}</strong>
          </div>
        )}

        <button type="submit" className="btn btn-info">Save Patient</button>
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

export default PatientForm;
