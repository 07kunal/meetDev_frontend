import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = (props: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Body */}
      <main className="flex-grow p-4 bg-base-100">{props.children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
