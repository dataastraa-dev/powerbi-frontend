import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants.js";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ logout, name }) => {
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Dashboard
        </Link>
        <div className="flex">
          <div className="text-gray-600 text-md lg:text-xl font-bold mx-5">
            {name ? `Welcome ${name.charAt(0).toUpperCase() + name.slice(1)}` : "Loading..."}
          </div>
          <button
            onClick={logout}
            className="text-red-500 text-lg hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const Sidebar = ({ images, setCurrentDashboard }) => {
  return (
    <div className="w-full md:w-64 bg-zinc-800 shadow-md p-4 md:fixed md:h-full overflow-y-auto mt-16 md:mt-8">
      {/* <h2 className="text-xl font-bold mb-4 text-blue-700">Available Dashboards</h2> */}
      <ul>
        {images.map((image, index) => (
          <li
            key={index}
            className="cursor-pointer text-white hover:text-gray-400 mb-2"
            onClick={() => setCurrentDashboard(index)}
          >
            {image.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserDashboard = ({ user }) => {
  const [userObj, setUserObj] = useState(null);
  const [currentDashboard, setCurrentDashboard] = useState(0);
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
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row mt-8 ">
      <Sidebar images={images} setCurrentDashboard={setCurrentDashboard} />
      <div className="flex-grow ml-0 md:ml-64">
        <Navbar logout={logout} name={name} />
        <div className="container mx-auto py-6 px-4 md:px-8 bg-white shadow-md rounded-md mt-16 md:mt-0">
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
      </div>
    </div>
  );
};

export default UserDashboard;
