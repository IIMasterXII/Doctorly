import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Home = () => {
  return (
    <main className="home-background text-center text-white">
      <div className="background-absolute"></div>
      <div className="bg-dark bg-opacity-50 p-5 rounded">
        <h1 className="display-4 fw-bold mb-4">Welcome to Doctorly</h1>
        <p className="lead mb-4">
          Your trusted platform for connecting with top-rated healthcare professionals.
        </p>
      {auth.loggedIn() ? (
      <Link to="/analysis" className="btn btn-warning">
        Take an Analysis &rarr;
      </Link>
      ) : (
      <Link to="/login" className="btn btn-warning">
        Login for your Analysis &rarr;
      </Link>
      )}
      </div>
    </main>
  );
};

export default Home;
// This is a simple React component that renders a main element with the text "Doctorly".
// It is a functional component that can be used in a larger application, such as a healthcare-related web application.