import { Link } from "react-router-dom";

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
      </div>
    </main>
  );
};

export default Home;
