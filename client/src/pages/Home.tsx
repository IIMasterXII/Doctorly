const Home = () => {
  return (

    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-8">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to Doctorly</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your trusted platform for connecting with top-rated healthcare professionals.
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
        Book an Appointment
      </button>
    </main>
  );
};

export default Home;
