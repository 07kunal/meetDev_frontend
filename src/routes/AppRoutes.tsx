import Layout from "@/components/layout/Layout";
import { useAppSelector } from "@/components/utils/customHooks/reduxHook";
import PrivateRoutes from "@/components/utils/Privateroute/PrivateRoutes";
import Home from "@/pages/Home/Home";
import LoginForm from "@/pages/loginForm/LoginForm";
import UserFeed from "@/pages/userFeed/UserFeed";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { LoginResponse } from "@/components/utils/type/user";
const AppRoutes = () => {
  const userData: LoginResponse = useAppSelector((state) => state?.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              userData.status ? <Navigate to="/feeds" replace /> : <LoginForm />
            }
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/feeds" element={<UserFeed />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
