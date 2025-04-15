import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log(user);
  

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;