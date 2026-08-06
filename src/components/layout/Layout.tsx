import { useQuery } from "@tanstack/react-query";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { clearUser, setUser } from "../utils/slices/userSliceReducer";
import { useAppDispatch } from "../utils/customHooks/reduxHook";
import type { UserProfile } from "../utils/type/user";
import { useEffect } from "react";
import getIsFetchApiCall from "../common/getIsFetchApiCall";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import fetchLoggedInUserProfileApi from "@/apis/fetchLoggedInUserProfileApi";

const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shouldFetchProfile = getIsFetchApiCall();

  const { data, isError, error } = useQuery<UserProfile>({
    queryKey: ["Profile"],
    queryFn: fetchLoggedInUserProfileApi,
    enabled: shouldFetchProfile,
    retry: false, // Disable retry on error
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError) {
      const axiosError = error as any;
      if (axiosError?.response?.status === 401) {
        dispatch(clearUser());
        Cookies.remove("token");
        navigate("/login");
      }
    }
  }, [isError, error, dispatch, navigate]);
  return (
    <div className="flex flex-col min-h-screen relative">
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
