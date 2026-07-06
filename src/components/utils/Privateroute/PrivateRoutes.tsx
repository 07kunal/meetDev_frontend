import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../customHooks/reduxHook";
import { GlobalLoader } from "@/components/Loader/GlobalLoader";

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return <GlobalLoader isLoading={true} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
