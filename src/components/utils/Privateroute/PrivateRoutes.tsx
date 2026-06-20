//utils/PrivateRoutes.js

import { Outlet, Navigate } from "react-router-dom";
import { useGetCookie } from "../customHooks/useGetCookie";
import type { Boolean } from "../type/commonType";

const PrivateRoutes = () => {
  let auth = useGetCookie<Boolean>();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
