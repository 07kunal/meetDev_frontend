import Layout from "@/components/layout/Layout";
import Home from "@/components/pages/Home/Home";
import LoginForm from "@/components/pages/loginForm/LoginForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "@/components/pages/Profile/Profile";
import PrivateRoutes from "@/utils/Privateroute/PrivateRoutes";
import { useAppSelector } from "@/utils/customHooks/reduxHook";
import UserFeed from "@/components/pages/userFeed/userFeed";
import SignUpPage from "@/components/pages/SignUpPage/SignUpPage";
import ResetPasswordPage from "@/components/pages/ResetPassword/ResetPasswordPage";
import UserIncommimgPendingRequest from "@/components/pages/userIncommingPendingRequest/UserIncommimgPendingRequest";
import LoggedInUserConnections from "@/components/pages/LoggedInUserConnections/LoggedInUserConnections";

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
            element={status ? <Navigate to="/userFeeds" replace /> : <LoginForm />}
          />
          <Route
            path="/signup"
            element={status ? <Navigate to="/userFeeds" replace /> : <SignUpPage />}
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/userFeeds" element={<UserFeed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
            <Route path="/pending-request" element={<UserIncommimgPendingRequest />} />
            <Route path="/userConnections" element={<LoggedInUserConnections />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
