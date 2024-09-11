import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="bg-zinc-900 text-white w-full md:w-64 space-y-6 py-7 px-2 mt-14 fixed md:h-full">
      <nav className="flex flex-col space-y-2">
        <button
          onClick={() => setActiveTab("userCreation")}
          className={`w-full text-left px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
            activeTab === "userCreation"
              ? "bg-zinc-700"
              : "bg-gray-900 hover:bg-gray-700"
          } focus:outline-none`}
        >
          User Creation
        </button>
        <button
          onClick={() => setActiveTab("imageUpload")}
          className={`w-full text-left px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
            activeTab === "imageUpload"
              ? "bg-gray-700"
              : "bg-gray-900 hover:bg-gray-700"
          } focus:outline-none`}
        >
          Image Upload
        </button>
        <button
          onClick={() => setActiveTab("viewUser")}
          className={`w-full text-left px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
            activeTab === "viewUser"
              ? "bg-gray-700"
              : "bg-gray-900 hover:bg-gray-700"
          } focus:outline-none`}
        >
          View Users
        </button>
        <button
          onClick={() => setActiveTab("viewImages")}
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
