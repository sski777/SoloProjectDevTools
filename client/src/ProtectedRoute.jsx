import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-lg text-gray-600 animate-pulse">Checking auth...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/pleaselogin" />;
};

export default ProtectedRoute;