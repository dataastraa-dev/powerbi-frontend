import React, {  useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({user ,  setActiveTab ,sidebarToggle, setSidebarToggle}) => {


  console.log("user: ",user)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

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
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <nav className="flex items-center justify-center w-full min-w-screen bg-white border-b-2 p-4 ">
            <div>
              <MenuIcon
                className="text-xl font-bold cursor-pointer"
                onClick={()=> setSidebarToggle(!sidebarToggle)}
                />
            </div>
      <div className="container flex items-center justify-end  "
          >
      {/* <button
          className="text-xl font-bold cursor-pointer"
          onClick={toggleSidebar }
        >
          {user === 2 ? <MenuIcon/> : <MenuIcon/> }
        </button> */}
        {/* <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
          </button>
        </div> */}
      
        <div>
          <Link to="/" className=" font-bold text-gray-800">
          <div className="text-gray-600 text-md lg:text-xl font-bold mr-4">
            {user && user.email 
              ? `Welcome ${
                user.email.split('@')[0].charAt(0).toUpperCase() + 
                user.email.split('@')[0].slice(1)}` 
                : "Loading..."}
          </div>
          </Link>
        </div>

        
        {/* <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div> */}


        {/* logOut */}
          <div className="relative">
              <div
                className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown}
              >
                {user.email && user.email.name ? user.email.name[0].toUpperCase() : "U"}
              </div>
              {dropdownVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
                >
                  <ul className="py-1">
                    {/* <li>
                      {isAuthenticated !== 2 && (
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                        onClick={handleChangePassword}
                      >
                        Change Password
                      </button>
                      )}
                    </li> */}
                    <li>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
          </div>
        {/* logout End */}
      </div>
    </nav>
  );
};

export default Navbar;
