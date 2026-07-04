import { jwtDecode } from "jwt-decode";
import { getCookie } from "./getCookieToken";

const getCheckValidityToken = ()=> {
  const token: string = getCookie("Token");
  try {
    const { exp } = jwtDecode(token);
    if (exp) {
      return Date.now() < exp * 1000;
    }
  } catch {
    return false;
  }
};
export default getCheckValidityToken;
