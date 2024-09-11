import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({user}) => {
  console.log("user: ",user)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    console.log("clicked logout");
    localStorage.removeItem("token"); // Clear token from local storage
    navigate("/", { replace: true });
    location.reload(); // Redirect to login page
  };

  const viewUsers = () => {
    navigate("/admin/view-users");
  };

  const viewAllImages = () => {
    navigate("/admin/view-images");
  };

  return (
    <nav className="fixed w-full top-0 left-0 bg-white border-b-2 p-4 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div>
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Dashboard
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:flex lg:w-auto lg:items-center justify-end`}
        >
          <div className="flex flex-col lg:flex-row lg:space-x-8 text-center">
          <div className="text-gray-600 text-md lg:text-xl font-bold">
    {user && user.email ? `Welcome ${user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)}` : "Loading..."}
</div>

            <span
              className="text-red-500 text-lg hover:text-red-700 cursor-pointer"
              onClick={logout}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
