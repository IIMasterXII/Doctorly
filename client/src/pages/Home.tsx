import Login from './Login'; // Adjust the path based on the actual location of Login.tsx
import { Link } from "react-routor-dom";

const Home = () => {

const Home = () => {
  return (
    <main className="home-background text-center text-white">
      <div className="bg-dark bg-opacity-50 p-5 rounded">
        <h1 className="display-4 fw-bold mb-4">Welcome to Doctorly</h1>
        <p className="lead mb-4">
          Your trusted platform for connecting with top-rated healthcare professionals.
        </p>
      <Link to="/appointment" className="btn btn-warning">
        Book An Appointment &rarr;
      </Link>
        <Login />
      </div>
    </main>
  );
};

export default Home;
// This is a simple React component that renders a main element with the text "Doctorly".
// It is a functional component that can be used in a larger application, such as a healthcare-related web application.