import { useQuery } from '@apollo/client';
import { GET_APPOINTMENTS_BY_PATIENT } from '../utils/queries';
import auth from '../utils/auth';

const patientId = auth.loggedIn() ? auth.getProfile().data._id : null;

function Appointments() {
  const { data, loading, error } = useQuery(GET_APPOINTMENTS_BY_PATIENT, {
    variables: { patientId },
  });

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data.getAppointmentsByPatient.length === 0) {
    return <p>No appointments yet.</p>;
  }

  return (
    <div className="p-5">
      <h2 className="text-primary mb-3">My Appointments</h2>
      <div className="list-group">
        {data.getAppointmentsByPatient.map((appointment: any) => (
          <button className="list-group-item list-group-item-action" key={appointment.id}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={'#' + appointment.id}
            aria-expanded="false"
            aria-controls={appointment.id}>
            <div>
              <h4>Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}</h4>
              <p className="font-italic">{appointment.doctor.specialty}</p>
              <div className="collapse mt-3" id={appointment.id}>
                <h5>Diagnosis:</h5>
                <p>"{appointment.diagnosis}"</p>
                <hr></hr>
                <h5>Scheduled:</h5>
                <p>{new Date(Number(appointment.createdAt)).toLocaleString()}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Appointments;