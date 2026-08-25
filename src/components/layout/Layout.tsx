import { useQuery } from "@tanstack/react-query";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { setAuthChecked, setUser } from "../utils/slices/userSliceReducer";
import { useAppDispatch, useAppSelector } from "../utils/customHooks/reduxHook";
import type { UserProfile } from "../utils/type/user";
import { useEffect } from "react";
import fetchLoggedInUserProfileApi from "@/apis/fetchLoggedInUserProfileApi";
import { useTokenExpiredMethod } from "../utils/customHooks/useTokenExpiredMethod";


const Layout = () => {
  const dispatch = useAppDispatch();
  const { authChecked } = useAppSelector((state) => state.user);
  const tokenExpiredMethod = useTokenExpiredMethod();

  const { data, isError, error } = useQuery<UserProfile>({
    queryKey: ["Profile"],
    queryFn: fetchLoggedInUserProfileApi,
    enabled: !authChecked,
    retry: false
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser({ ...data, authChecked: true }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError && !authChecked) {
      dispatch(setAuthChecked());
      const axiosError = error as any;
      if (axiosError?.response?.status === 401) {
        tokenExpiredMethod();
      }
    }
  }, [isError, error, authChecked, dispatch, tokenExpiredMethod]);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <Navbar />

      {/* Body */}
      <main className="flex-grow  bg-base-100 pt-20">
        <Outlet /> 
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
