import { useAppSelector } from "../utils/customHooks/reduxHook";
import { getCookieToken } from "./getCookieToken";
import type { LoginResponse } from "../utils/type/user";
import type { Boolean } from "../utils/type/commonType";

const getIsFetchApiCall = (): Boolean => {
  const userData: LoginResponse = useAppSelector((state) => state?.user);
  const shouldFetchAPI: Boolean = !!(userData?.isAuthenticated&& !userData?.status);

  return shouldFetchAPI;
};
export default getIsFetchApiCall;

/*
 in JavaScript and TypeScript, logical expressions like hasToken && !userData?.status do not automatically return a clean primitive boolean. They return the actual value of the last evaluated operand.

 Use Double Negation !! (Recommended)The double exclamation mark forces the entire right-hand expression to evaluate strictly to a primitive boolean type, which safely satisfies TypeScript:
*/
