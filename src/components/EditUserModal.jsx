import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { BASE_URL } from "../constants.js";

const EditUserModal = ({ user, images, onClose, onUpdate }) => {
  const [updatedUser, setUpdatedUser] = useState({
    ...user,
    images: user.images.map((img) => ({ value: img._id, label: img.name })),
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleImageSelect = (selectedOptions) => {
    setUpdatedUser({
      ...updatedUser,
      images: selectedOptions ? selectedOptions : [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: token };
      const { data } = await axios.put(
        `${BASE_URL}/user/${user._id}`,
        {
          ...updatedUser,
          images: updatedUser.images.map((img) => img.value),
        },
        { headers }
      );

      if (data.success) {
        setSuccess("User updated successfully.");
        onUpdate(data.user);
        onClose();
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
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
              value={updatedUser.images}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default EditUserModal;
