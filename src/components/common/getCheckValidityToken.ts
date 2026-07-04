import { jwtDecode } from "jwt-decode";

const getCheckValidityToken = (token: string) => {
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
