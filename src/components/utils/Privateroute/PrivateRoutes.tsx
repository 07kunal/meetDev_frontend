import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../customHooks/reduxHook";

const PrivateRoutes = () => {
  const { status, authChecked } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!authChecked) {
    return null; // waiting for profile restoration
  }

  if (!status) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
