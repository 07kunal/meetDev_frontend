import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
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
