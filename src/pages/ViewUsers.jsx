import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import UserList from "../components/UsersComponents/UserList";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Select from "react-select";
import CloseIcon from "@mui/icons-material/Close";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const[isDelete, setIsDelete] = useState(false);
  const [userObj, setUserObj] = useState({
    email: "",
    password: "",
    name: "",
    images: [],
  });
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

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

  const onDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: token };
      await axios.delete(`${BASE_URL}/user/${userObj._id}`, { headers });
      fetchUsers();
      closePopUp();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleDeleteClick = (userData) => {
    setFilterPopupVisible(true);
    setIsDelete(true);
    setUserObj({
      ...userData,
      images: userData.images.map((img) => ({ value: img._id, label: img.name })),
    });
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
    
  const closePopUp = async () => {
    setFilterPopupVisible(false);
    setIsDelete(false);
    setUserObj({
      email: "",
      password: "",
      name: "",
      images: [],
    });
  }

  const test = isDelete ? userObj.images : images.filter((image) =>
    userObj.images.includes(image.value)
  )
  console.log(isDelete, userObj)
  return (
    <div className=" w-full min-h-screen flex flex-col flex-grow bg-gray-100 overflow-x-hidden">
      <div className="p-6 bg-white shadow-md rounded-md ">
        <div className=" flex justify-between ">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 ">Users</h1>    
          
            <button className="bg-blue-500 text-white px-4 py-2 mb-2 mt-2 rounded-md hover:bg-blue-600 w-full xs:w-28 sm:w-28 "
              onClick={()=> setFilterPopupVisible(true)}
              >Add User</button>
          
        </div> 
        {error && <p className="text-red-500 text-center">{error}</p>}
        <UserList users={users} handleDeleteClick={handleDeleteClick} fetchUsers={fetchUsers}/>
      </div>
      {filterPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl  h-[50%] m-3">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">{!isDelete ? "Create User" : "Do You Want to delete this user?"}</h2>
              <div>
                <CloseIcon className="cursor-pointer" onClick={() => closePopUp()}/>
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
                    disabled={isDelete}
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
                    disabled={isDelete}
                  />
                </div>
                {!isDelete ?
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
                  </div> : <></>
                }
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Select Reports</label>
                  <Select
                    isMulti
                    name="images"
                    options={images}
                    className="mt-1 block w-full"
                    placeholder={"Select Images"}
                    // classNamePrefix="select"
                    onChange={handleImageSelect}
                    value={test}
                  />
                </div>
                <div className="flex justify-between ">
                  <button
                    type="button"
                    onClick={() => {!isDelete ? createUser() : onDelete()}}
                    className={`w-full xs:mt-0 lg:mt-1 px-4 py-2 ${isDelete ? "bg-red-500 hover:bg-red-700" :"bg-blue-500 hover:bg-blue-600"} text-white rounded-lg bg-gray-10 transition-colors duration-200`}
                  >
                    {!isDelete ? "Create User" : "Delete User"}
                  </button>
                </div>
          </form>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
        </div>
      </div>
      )}
    </div>
  );
};

export default ViewUsers;
