import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Error from './pages/Error';
import PatientForm from './components/PatientForm';
import Doctor from './components/Doctor';
import Appointment from './components/Appointment';
import"bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, path: '/home',element: <Home /> },
      { path: '/patient', element: <PatientForm /> },
      { path: '/doctor', element: <Doctor /> },
      { path: '/appointment', element: <Appointment /> },
      
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}