import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../customHooks/reduxHook";
import { getCookieToken } from "@/components/common/getCookieToken";

const PrivateRoutes = () => {
  const { status } = useAppSelector((state) => state.user);
  const location = useLocation();

  // If there's a token but `status` is still false, the app is likely
  // restoring the user profile (race on page reload). In that case,
  // don't redirect to `/login` yet — wait for the profile fetch to finish.
  const hasToken = getCookieToken<boolean>();
  if (hasToken && !status) {
    return null; // render nothing while auth is being verified
  }

  if (!status) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
