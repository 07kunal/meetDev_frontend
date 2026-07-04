//utils/PrivateRoutes.js

import { Outlet, Navigate } from "react-router-dom";
import type { Boolean } from "../type/commonType";
import { getCookieToken } from "../../common/getCookieToken";

const PrivateRoutes = () => {
  let auth = getCookieToken<Boolean>();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
