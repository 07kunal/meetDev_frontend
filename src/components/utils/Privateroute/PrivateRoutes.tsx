import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../customHooks/reduxHook";

const PrivateRoutes = () => {
  const { status} = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!status) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
