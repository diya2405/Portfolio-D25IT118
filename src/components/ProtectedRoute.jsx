import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../components/Auth.css';

function ProtectedRoute({ children }) {
  const { token, checking } = useAuth();

  if (checking) {
    return <div className="auth-checking">checking session…</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
