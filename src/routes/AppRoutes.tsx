import Layout from "@/components/layout/Layout";
import PrivateRoutes from "@/components/utils/Privateroute/privateRoutes";
import Home from "@/pages/Home/Home";
import LoginForm from "@/pages/loginForm/LoginForm";
import UserFeed from "@/pages/userFeed/UserFeed";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/feeds" element={<UserFeed />}  />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
