//utils/PrivateRoutes.js

import { Outlet, Navigate } from "react-router-dom";
import type { Boolean } from "../type/commonType";
import { getCookieToken } from "../../common/getCookieToken";
import getCheckValidityToken from "@/components/common/getCheckValidityToken";

const PrivateRoutes = () => {
  let auth = getCookieToken<Boolean>();
  const getCookie = (name: string): string => {
    const value = `${document.cookie}`;
    const parts = value.split(`${name}=`);
    return parts[1];
  };
  let token: string = getCookie("token");
  let tokenValidate = getCheckValidityToken(token);
console.log('tokenCheck',tokenValidate);
  return tokenValidate ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
