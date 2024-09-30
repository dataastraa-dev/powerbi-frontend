import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../constants.js";
import { Link, Outlet, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

// Navbar Start
const Navbar = ({ logout, name, setSidebarToggle,sidebarToggle }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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
      <div className="container flex items-center justify-end ">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          <div className="text-gray-600 text-md lg:text-xl font-bold mx-5">
            {name ? `Welcome ${name.charAt(0).toUpperCase() + 
            name.slice(1)}` : "Loading..."}
          </div>
        </Link>
        {/* Logout */}
        {/* <div className="flex">
          <button
            onClick={logout}
            className="text-red-500 text-lg hover:text-red-600"
          >
            Logout
          </button>
        </div> */}
        <div className="relative">
              <div
                className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown}
              >
                {name ? name[0].toUpperCase() : "U"}
              </div>
              {dropdownVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
                >
                  <ul className="py-1">
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
        {/* Logout end*/}
      </div>
    </nav>
  );
};
//  Navbar End

// Sidebar Start
const Sidebar = ({ images, setCurrentDashboard,currentDashboard,sidebarToggle, setSidebarToggle }) => {

  const dropdownRef = useRef(null);
  
  return (
    <div className={`p-5 insert-y-0 left-0
                    transform ${sidebarToggle ? "-translate-x-full " : ""} 
                    transition-transform duration-600 ease-in-out
                    bg-zinc-900 text-white p-5 w-60 
                    `}
                    ref={dropdownRef}>
      {/* <h2 className="text-xl font-bold mb-4 text-blue-700">Available Dashboards</h2> */}
      {/* <ul className="w-full text-left px-4 py-2 bg-gray-900 text-sm font-semibold rounded-lg">
        {images.map((image, index) => (
          <li
            key={index}
            className="cursor-pointer text-white hover:text-gray-400 mb-2"
            onClick={() => setCurrentDashboard(index)}
          >
            {image.name}
          </li>
        ))}
      </ul> */}
      <div className="w-full flex items-center mb-6">
        <p className="text-2xl font-bold text-white ">DataAstraa</p>
      </div>  
      <div className="flex flex-col flex-grow space-y-2">
        {images.map((image, index) => (

          <button
          onClick={() =>{setCurrentDashboard(index)            
              }}
              className={`w-full text-left px-4 py-3  text-sm font-semibold rounded-lg
                ${currentDashboard === (index)
                ? "bg-gray-700"
                : "bg-gray-900 hover:bg-gray-700"
                }`}
            >
              {image.name}
            </button>
        ))}
      </div>
    </div>
  );
};

// Sidebar end

//  User Dashboard Start

const UserDashboard = ({ user }) => {
  const [userObj, setUserObj] = useState(null);
  const [currentDashboard, setCurrentDashboard] = useState(0);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/user/${user.id}`, {
          headers: { Authorization: token },
        });
        setUserObj(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUser();
  }, [user.id]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  if (!userObj) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container mx-auto py-6 bg-white shadow-md rounded-md text-center">
          <h2 className="text-3xl font-bold text-gray-800">Loading...</h2>
        </div>
      </div>
    );
  }

  const { name, images } = userObj;

  return (
    <div className="flex bg-gray-100 ">
      <Sidebar images={images} setCurrentDashboard={setCurrentDashboard} 
                sidebarToggle={sidebarToggle}/>
          
          <div className={`flex flex-grow  
                          justify-start overflow-x-auto
                          flex flex-col min-h-screen
                          transform ${sidebarToggle ? "-ml-60 " : "ml-0"}
                          transition-all duration-600 ease-in-out
                          `}>
            <div className="flex flex-col xs:w-screen sm:w-screen lg:w-full">
              <Navbar logout={logout} name={name} 
                      sidebarToggle={sidebarToggle} 
                      setSidebarToggle={setSidebarToggle}/>
              <div className="w-full mx-auto py-6 px-4 md:px-8 bg-white shadow-md rounded-md md:mt-0">
                <div className="p-4 text-center">
                  <div className="font-bold text-xl mb-2 text-gray-900">
                    {images[currentDashboard].name}
                  </div>
                  <p className="text-gray-700"> 
                    Created at:{" "}
                    {new Date(images[currentDashboard].createdAt).toLocaleString()}
                  </p>
                </div>
                {images.length === 0 ? (
                  <p className="text-gray-700 text-center">
                    You have no uploaded images.
                  </p>
                ) : (
                  <div className="w-full h-screen flex justify-center items-center">
                    <iframe
                      title={images[currentDashboard].name}
                      className="w-full h-full"
                      src={images[currentDashboard].imageURL}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
              <Outlet/>
            </div>
          </div>
          
    </div>
  );
};
//  User Dashboard end
export default UserDashboard;
