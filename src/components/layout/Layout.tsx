import { useQuery } from "@tanstack/react-query";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import fetchLoggedInUserProfile from "@/apis/fetchLoggedInUserProfile";
import { setUser } from "../utils/slices/userSliceReducer";
import { useAppDispatch} from "../utils/customHooks/reduxHook";
import type { LoginResponse } from "../utils/type/user";
import { useEffect } from "react";
import getIsFetchApiCall from "../common/getIsFetchApiCall";


const Layout = () => {
  const dispatch = useAppDispatch();
  const shouldFetchProfile = getIsFetchApiCall();

  const { data } = useQuery<LoginResponse>({
    queryKey: ["Profile"],
    queryFn: fetchLoggedInUserProfile,
    enabled: shouldFetchProfile,
  });
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  
// console.log("hasToken", hasToken);
// console.log("userData", userData.status);
// console.log("shouldFetchProfile", shouldFetchProfile);
console.log('TEST----1');
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Body */}
      <main className="flex-grow p-4 bg-base-100">
        <Outlet /> {/* 👈 Route content renders here */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
