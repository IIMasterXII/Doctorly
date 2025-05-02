import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Error from './pages/Error';
import PatientForm from './components/PatientForm';
import Doctor from './components/Doctor';
import Appointment from './components/Appointment';
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'patients', element: <PatientForm /> },
      { path: 'doctors', element: <Doctor /> },
      { path: 'appointments', element: <Appointment /> },
      { path: 'appointments', element: <Appointment /> }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}