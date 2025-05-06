import { useState } from "react";
import { useMutation } from '@apollo/client';
import { useLazyQuery } from "@apollo/client";
import { GET_DIAGNOSIS } from '../utils/mutations';
import { QUERY_SPECIALIZED_DOCTOR } from "../utils/queries";
import ScheduleButton from "./ScheduleButton";

const Analysis = () => {
  const [symptoms, setSymptoms] = useState('');
  const [getDiagnosis, { data: diagnosisData, loading: loadingDiagnosis }] =
    useMutation(GET_DIAGNOSIS, {
      onCompleted: (data) => {
        // Trigger doctor query when mutation completes
        fetchDoctors({ variables: { specialty: data.getDiagnosis.specialist } });
      }
    });

  const [fetchDoctors, { data: doctorsData, loading: loadingDoctors }] =
    useLazyQuery(QUERY_SPECIALIZED_DOCTOR);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault(); // ✅ This prevents the default form submit (page reload)
    await getDiagnosis({ variables: { symptoms } });
  };

  return (
    <div className="p-5">
      <h2 className="text-primary mb-3">Symptom Analysis</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <textarea
          className="form-group w-100 p-2"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Describe your symptoms..."
        />
        <hr></hr>
        <button className="btn btn-primary" type="submit" disabled={loadingDiagnosis}>
          {loadingDiagnosis ? "Analyzing..." : "Get Diagnosis"}
        </button>
      </form>

      {diagnosisData && (
        <div className="card mb-3 p-3">
          <h4>Diagnosis:</h4>
          <p>{diagnosisData.getDiagnosis.diagnosis}</p>
          <p>
            <strong>Specialist:</strong> {diagnosisData.getDiagnosis.specialist}
          </p>
        </div>
      )}

      {loadingDoctors && <p>Loading doctors...</p>}

      {doctorsData && (
        <div>
          <h2 className="text-primary mb-3">Available Doctors</h2>
          {doctorsData.doctorsBySpecialty.length > 0 ? (
            <div>
              {doctorsData.doctorsBySpecialty.map((doc: any, index: any) => (
                <div className="card flex flex-row p-3 justify-content-between" key={index}>
                  <div>
                    <h4>Dr. {doc.firstName} {doc.lastName}</h4>
                    <p>({doc.specialty})</p>
                  </div>
                  <ScheduleButton doctorId={doc._id} diagnosis={diagnosisData.getDiagnosis.diagnosis} />
                </div>
              ))}
            </div>
          ) : (
            <p>No available doctors for this specialty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Analysis;