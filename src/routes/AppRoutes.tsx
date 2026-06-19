import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home/Home";
import LoginForm from "@/pages/loginForm/LoginForm";
import userFeed from "@/pages/userFeed/userFeed";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/feeds" element={<userFeed /> } />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
