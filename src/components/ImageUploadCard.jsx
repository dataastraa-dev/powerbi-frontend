import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants.js";

const ImageUploadCard = () => {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const addImage = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const headers = { Authorization: token };
      const { data } = await axios.post(
        `${BASE_URL}/admin/images`,
        { name, imageURL },
        { headers }
      );
      setSuccess(data.message);
      setName("");
      setImageURL("");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add Image</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Image Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Image Name"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Image URL</label>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Image URL"
          />
        </div>
        <button
          type="button"
          onClick={addImage}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImageUploadCard;
