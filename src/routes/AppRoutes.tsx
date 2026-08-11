import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home/Home";
import LoginForm from "@/pages/loginForm/LoginForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "@/pages/Profile/Profile";
import PrivateRoutes from "@/components/utils/Privateroute/PrivateRoutes";
import { useAppSelector } from "@/components/utils/customHooks/reduxHook";
import UserFeed from "@/pages/userFeed/userFeed";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import ResetPasswordPage from "@/pages/ResetPassword/ResetPasswordPage";
import UserIncommimgPendingRequest from "@/pages/userIncommingPendingRequest/UserIncommimgPendingRequest";
import LoggedInUserConnections from "@/pages/LoggedInUserConnections/LoggedInUserConnections";

const AppRoutes = () => {
  const { status } = useAppSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Public Routes */}
          <Route
            path="/login"
            element={status ? <Navigate to="/feeds" replace /> : <LoginForm />}
          />
          <Route
            path="/signup"
            element={status ? <Navigate to="/feeds" replace /> : <SignUpPage />}
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/feeds" element={<UserFeed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset_password" element={<ResetPasswordPage />} />
            <Route path="/pending-request" element={<UserIncommimgPendingRequest />} />
            <Route path="/user-connections" element={<LoggedInUserConnections />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
