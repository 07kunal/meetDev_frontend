import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home/Home";
import LoginForm from "@/pages/loginForm/LoginForm";
import UserFeed from "@/pages/userFeed/UserFeed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "@/pages/Profile/Profile";
import PublicRoutes from "@/components/utils/PublicRoute/PublicRoutes";
import PrivateRoutes from "@/components/utils/Privateroute/PrivateRoutes";

const AppRoutes = () => {
  console.log("approutrs----");
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginForm />} />
          </Route>
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
