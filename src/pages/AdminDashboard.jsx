import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import UserCreationCard from "../components/UserCreationCard";
import ImageUploadCard from '../components/ImageUploadCard';
import ViewUsers from '../pages/ViewUsers';
import ViewAllImages from '../pages/ViewAllImages';
import { Outlet } from "react-router-dom";

const AdminDashboard = ({ user}) => {
  const [activeTab, setActiveTab] = useState("ViewUsers");
  const [sidebarToggle, setSidebarToggle] = useState(true);


  const renderContent = () => {
    switch (activeTab) {
      case "viewUser":
        return <ViewUsers 
                sidebarToggle={sidebarToggle} 
                setSidebarToggle={setSidebarToggle}
                />;
      case "userCreation":
        return <UserCreationCard 
                sidebarToggle={sidebarToggle} 
                setSidebarToggle={setSidebarToggle}/>;
      case "imageUpload":
        return <ImageUploadCard 
                sidebarToggle={sidebarToggle} 
                setSidebarToggle={setSidebarToggle}/>;
      case "viewImages":
        return <ViewAllImages 
                sidebarToggle={sidebarToggle} 
                setSidebarToggle={setSidebarToggle}/>;
      default:
        return <ViewUsers/>;
    }
  };

  return (
    <>
          <div className="flex  bg-gray-100 ">
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}
                sidebarToggle={sidebarToggle} />
            <div className={` flex flex-grow  
                              justify-start overflow-x-auto
                                flex flex-col min-h-screen
                                transform ${sidebarToggle ? "-ml-60 " : "ml-0"}
                                transition-all duration-600 ease-in-out 
                                `}  >
                <div className={`flex flex-col xs:w-screen sm:w-screen lg:w-full
                                  `}>
                  <Navbar user={user}
                          sidebarToggle={sidebarToggle} 
                          setSidebarToggle={setSidebarToggle}/>
                  {renderContent()}
                </div>
                <Outlet />
            </div>
          </div>
    </>
  );
};

export default AdminDashboard;
