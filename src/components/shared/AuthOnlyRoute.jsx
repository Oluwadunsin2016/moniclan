import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";

const AuthOnlyRoute = () => {
  const { user } = useAuth();
  console.log(user);

  return !user ? <Outlet /> : <Navigate to="/home" replace />;
};

export default AuthOnlyRoute;
