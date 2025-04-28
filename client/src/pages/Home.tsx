import react, {useState} from "react";
const Home = () => {

  const [symptoms, setSymptoms] = useState("");
  const [submittedSymptoms, setSubmittedSymptoms] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSymptoms(event.target.value);
  };

  const handleSubmit = () => {
    e.preventDefault();
    setSubmittedSymptoms(symptoms);
    setSymptoms("")
  }

  return (
    <main>
      Doctorly

      <div>
        <h2>What are your symptoms?</h2>
            <textarea
            value={symptoms}
            onChange={handleInputChange}
            placeholder="Type in your symptoms here..."
            rows={5}
            cols={40}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
      </div>

      {submittedSymptoms && (
        <div style={{ marginTop: "20px", padding: "10px"}}>
          <h2>Recommendations for your Symptoms</h2>
          <p>{submittedSymptoms}</p>
        </div>
      )}
    </main>
  );
};

export default Home;
