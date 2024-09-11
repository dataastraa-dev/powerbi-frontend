import React from "react";
import Sidebar from "./components/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default Layout;
