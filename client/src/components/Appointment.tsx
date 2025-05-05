import { useState, useEffect } from "react";

interface AppointmentEntry {
  patientName: string;
  doctorName: string;
  appointmentDate: string;
}

const Appointment = () => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointments, setAppointments] = useState<AppointmentEntry[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Load existing appointments from localStorage on first render
  useEffect(() => {
    const stored = sessionStorage.getItem("appointments");
    if (stored) setAppointments(JSON.parse(stored));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName || !doctorName || !appointmentDate) {
      alert("Please fill out all fields.");
      return;
    }

    const newAppointment: AppointmentEntry = {
      patientName,
      doctorName,
      appointmentDate,
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    sessionStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    setSubmitted(true);
    setPatientName("");
    setDoctorName("");
    setAppointmentDate("");

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Book an Appointment</h2>

      {submitted && (
        <div className="alert alert-success" role="alert">
          Appointment booked successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {appointments.length > 0 && (
        <>
          <h3 className="mt-5">Appointments</h3>
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={index}>
                  <td>{appt.patientName}</td>
                  <td>{appt.doctorName}</td>
                  <td>{appt.appointmentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Appointment;
