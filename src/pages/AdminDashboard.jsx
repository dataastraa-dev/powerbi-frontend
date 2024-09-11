import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import UserCreationCard from "../components/UserCreationCard";
import ImageUploadCard from '../components/ImageUploadCard';
import ViewUsers from '../pages/ViewUsers';
import ViewAllImages from '../pages/ViewAllImages';

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("userCreation");

  const renderContent = () => {
    switch (activeTab) {
      case "userCreation":
        return <UserCreationCard />;
      case "imageUpload":
        return <ImageUploadCard />;
      case "viewUser":
        return <ViewUsers />;
      case "viewImages":
        return <ViewAllImages />;
      default:
        return <UserCreationCard />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <Navbar user={user} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow ml-0 md:ml-64">
          <div className="flex items-center justify-center mt-8">
            {renderContent()}
          </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
