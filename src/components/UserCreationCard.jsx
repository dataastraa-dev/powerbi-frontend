import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { BASE_URL } from "../constants";

const UserCreationCard = () => {
  const [userObj, setUserObj] = useState({
    email: "",
    password: "",
    name: "",
    images: [],
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
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

  return (
    <div className="max-w-lg w-full mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create User</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={userObj.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800 border-gray-300"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800 border-gray-300"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800 border-gray-300"
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Images</label>
          <Select
            isMulti
            name="images"
            options={images}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleImageSelect}
            value={images.filter((image) =>
              userObj.images.includes(image.value)
            )}
          />
        </div>
        <button
          type="button"
          onClick={createUser}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Create User
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
    </div>
  );
};

export default UserCreationCard;
