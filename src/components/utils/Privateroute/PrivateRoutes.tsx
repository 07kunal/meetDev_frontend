import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../customHooks/reduxHook";
const PrivateRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const location = useLocation();

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
