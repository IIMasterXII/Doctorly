import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login';
import Analysis from './components/Analysis';
import Appointments from './pages/Appointments';
import { ProtectedRoute } from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, path: '/',element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/analysis', element: <ProtectedRoute><Analysis /></ProtectedRoute> },
      { path: '/appointments', element: <ProtectedRoute><Appointments /></ProtectedRoute> },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}