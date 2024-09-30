import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import UserList from "../components/UsersComponents/UserList";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserCreationCard from "../components/UserCreationCard";
import { MdClose } from "react-icons/md";
import Select from "react-select";



const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(`${BASE_URL}/user/allUsers`, {
        headers,
      });
      setUsers(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

// user creation card 
const [filterPopupVisible, setFilterPopupVisible] = useState(false);

 
const applyFilters = () => {
  setFilterPopupVisible(false);
};

useEffect(() => {
  if (filterPopupVisible) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [filterPopupVisible]);


const [userObj, setUserObj] = useState({
  email: "",
  password: "",
  name: "",
  images: [],
});
const [images, setImages] = useState([]);

const [success, setSuccess] = useState(null);

useEffect(() => {
  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/admin/images`, {
        headers: {
          Authorization: token,
        },
      });
      setImages(
        response.data.data.map((img) => ({ value: img._id, label: img.name }))
      );
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  fetchImages();
}, []);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUserObj({ ...userObj, [name]: value });
};

const handleImageSelect = (selectedOptions) => {
  setUserObj({
    ...userObj,
    images: selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [],
  });
};

const createUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const headers = { Authorization: token };
    const { data } = await axios.post(`${BASE_URL}/user/create`, userObj, {
      headers,
    });

    if (data.success) {
      setSuccess("User created successfully.");
      setUserObj({
        email: "",
        password: "",
        name: "",
        images: [],
      });
      navigate("/");
      
    } else {
      setError(data.message);
      
    }
  } catch (error) {
    setError(error.response?.data?.message || error.message);
  }
  setTimeout(() => {
    setError(null);
    setSuccess(null);
  }, 3000);
};
// user creation card end
  

  return (
    <div className="  flex flex-col flex-grow bg-gray-100 overflow-x-hidden">
      <div className="p-6 bg-white shadow-md rounded-md ">
        <div className=" flex justify-between ">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 ">Users</h1>    
          
            <button className="bg-blue-500 text-white px-4 py-2 mb-2 mt-2 rounded-md hover:bg-blue-600 w-full xs:w-28 sm:w-28 "
              onClick={()=> setFilterPopupVisible(true)}
              >Add User</button>
          
        </div> 
        {error && <p className="text-red-500 text-center">{error}</p>}
        <UserList users={users} onDelete={handleDelete} />
      </div>
      {filterPopupVisible && (
        <div className="absolute top-0 left-0 h-screen w-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white  p-4 rounded-md shadow-lg flex flex-col  md:w-1/2 md:gap-4 h-[60vh] ">
            <div className="w-full p-6 bg-white rounded-lg ">
              <div className="flex justify-between ">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create User</h2>
                    <div>
                      <MdClose
                        onClick={() => setFilterPopupVisible(false)}
                        className=" text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
                      />
                    </div>
              </div>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userObj.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-10 text-gray-800 border-gray-300"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userObj.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-10 text-gray-800 border-gray-300"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={userObj.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray10 text-gray-800 border-gray-300"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Select Images</label>
                  <Select
                    isMulti
                    name="images"
                    options={images}
                    className="mt-1 block w-full"
                    placeholder={"Select Images"}
                    // classNamePrefix="select"
                    onChange={handleImageSelect}
                    value={images.filter((image) =>
                      userObj.images.includes(image.value)
                    )}
                  />
                </div>
                <div className="flex justify-between ">
                  <button
                    type="button"
                    onClick={createUser}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 bg-gray-10 transition-colors duration-200"
                  >
                    Create User
                  </button>
                </div>
              </form>
              {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
              {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
            </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ViewUsers;
