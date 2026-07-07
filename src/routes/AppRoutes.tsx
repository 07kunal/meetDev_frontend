import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home/Home";
import LoginForm from "@/pages/loginForm/LoginForm";
import UserFeed from "@/pages/userFeed/UserFeed";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "@/pages/Profile/Profile";
import PrivateRoutes from "@/components/utils/Privateroute/PrivateRoutes";
import { useAppSelector } from "@/components/utils/customHooks/reduxHook";

const AppRoutes = () => {
  const { status,data } = useAppSelector((state) => state.user);
console.log('status ====',status);
console.log('data',data);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              status ? <Navigate to="/feeds" replace /> : <LoginForm />
            }
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/feeds" element={<UserFeed />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
