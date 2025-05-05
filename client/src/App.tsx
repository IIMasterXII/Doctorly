import React from 'react';
import NavTabs from './components/NavTabs';
import './App.css';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (

    <>
    
      <NavTabs />
      <Outlet />
    </>
  );
};

export default App;