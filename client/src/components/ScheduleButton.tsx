import { useMutation } from '@apollo/client';
import { CREATE_APPOINTMENT } from '../utils/mutations';
import auth from '../utils/auth';

export default function ScheduleButton({ doctorId, diagnosis }: any) {
    const [createAppointment, { loading, error, data }] = useMutation(CREATE_APPOINTMENT);

    const handleSchedule = () => {
        const patientId = auth.getProfile().data._id;
        console.log(patientId);
        console.log(doctorId);
        if (!patientId) {
            alert("Please log in to schedule an appointment.");
            return;
        }

        createAppointment({
            variables: {
                input: { patientId, doctorId, diagnosis }
            }
        });
    };

    return (
        <div>
            {!data &&
            <button className="btn btn-primary" onClick={handleSchedule} disabled={loading}>
                {loading ? "Scheduling..." : "Schedule Appointment"}
            </button>
            }
            {data && <button className="btn btn-success">Appointment scheduled!</button>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}