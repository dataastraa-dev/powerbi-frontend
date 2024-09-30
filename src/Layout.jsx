import React from "react";
import Sidebar from "./components/SideBar";
import { Outlet } from "react-router-dom";

const Layout = ({ children, isOpen, user, toggleSidebar, setSidebarToggle, sidebarToggle }) => {
  return (
    <div className="flex ">
      {user === 2 && (

      <Sidebar 
      sidebarToggle={sidebarToggle}
      setSidebarToggle={setSidebarToggle}
      toggleSidebar={toggleSidebar}
      user={user}
      />
      )}
      <div
        className={`w-full transition-all duration-300 ease-in-out transform ${
          sidebarToggle ? "ml-60" : "ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
