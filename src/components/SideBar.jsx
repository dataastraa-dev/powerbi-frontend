import React ,{ useRef }from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importing icons for arrows
import Navbar from "./Navbar";

const Sidebar = ({ activeTab, setActiveTab,sidebarToggle, setSidebarToggle}) => {


  return (
  
    <aside className={` p-5 insert-y-0 left-0
        transform ${sidebarToggle ? "-translate-x-full " : ""} 
        transition-transform duration-600 ease-in-out
        bg-zinc-900 text-white p-5 w-60 
        `}
        
     >
      
      <div className="w-full flex items-center mb-6">
        <p className="text-2xl font-bold text-white ">DataAstraa</p>
      </div>      

      <nav className="flex flex-col flex-grow space-y-2">
        {/* <button
          onClick={() => setActiveTab("userCreation")}
          className={`w-full text-left px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
            activeTab === "userCreation"
              ? "bg-zinc-700"
              : "bg-gray-900 hover:bg-gray-700"
          } focus:outline-none`}
        >
          User Creation
        </button> */}
        <button 
          onClick={() => {
            setActiveTab("viewUser")  
            
            }
            
          }
          className={`w-full text-left px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
            activeTab === "viewUser"
              ? "bg-gray-700 "
              : "bg-gray-900 hover:bg-gray-700 "
            
              
          } focus:outline-none`}
        >
          Users
        </button>
        {/* <button
          onClick={() => setActiveTab("imageUpload")}
          className={`w-full text-left px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
            activeTab === "imageUpload"
              ? "bg-gray-700"
              : "bg-gray-900 hover:bg-gray-700"
          } focus:outline-none`}
        >
          Image Upload
        </button> */}
        <button
          onClick={() => {
            setActiveTab("viewImages")
            
          }}
          className={`w-full text-left px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
            activeTab === "viewImages"
              ? "bg-gray-700"
              : "bg-gray-900 hover:bg-gray-700"
          } focus:outline-none`}
        >
          View Images
        </button>
      </nav>
      
    </aside>
    
  );
  
};

export default Sidebar;
