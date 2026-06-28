import Layout from "@/components/layout/Layout";
import PrivateRoutes from "@/components/utils/Privateroute/PrivateRoutes";
import Home from "@/pages/Home/Home";
import LoginForm from "@/pages/loginForm/LoginForm";
import UserFeed from "@/pages/userFeed/UserFeed";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCookieToken } from "@/components/common/getCookieToken";
import type { Boolean } from "@/components/utils/type/commonType";
const AppRoutes = () => {
  const hasToken = getCookieToken<Boolean>();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              hasToken ? <Navigate to="/feeds" replace /> : <LoginForm />
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
