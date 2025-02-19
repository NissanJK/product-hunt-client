import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth(); 
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center h-svh"><span className="loading loading-infinity loading-lg"></span></div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;