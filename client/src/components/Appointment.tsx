import { useState } from "react";


const Appointment = () => {
  const [patientName, setPatientName] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");

  return (
    <div className="container form-componet appointment-form">
      <h2>Appointment</h2>
      <form>
        <div>
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Appointment;
