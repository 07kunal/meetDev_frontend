import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../customHooks/reduxHook";


const PublicRoutes = () => {
  const { isAuthenticated } = useAppSelector(
    (state) => state.user
  );
  if (isAuthenticated) {
    return <Navigate to="/feeds" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;