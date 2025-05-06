import { Navigate } from 'react-router-dom';
import auth from '../utils/auth';

export const ProtectedRoute = ({ children }: any) => {

  if (!auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};