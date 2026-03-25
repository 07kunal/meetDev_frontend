import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import LoginForm from "@/pages/loginForm/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
