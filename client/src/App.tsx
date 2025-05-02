import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientForm from './components/PatientForm';
import Doctor from './components/Doctor';
import Appointment from './components/Appointment';

import Home from './pages/Home'; 
import './App.css';

const App: React.FC = () => {
  return (
    
      <div className="app-container">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient-form" element={<PatientForm />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </div>
    
  );
};

export default App;