import Login from './Login'; // Adjust the path based on the actual location of Login.tsx

const Home = () => {

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h1 className="card-header bg-dark text-light p-2 text-center">Doctorly</h1>
          <div className="card-body">
            <Login />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
// This is a simple React component that renders a main element with the text "Doctorly".
// It is a functional component that can be used in a larger application, such as a healthcare-related web application.