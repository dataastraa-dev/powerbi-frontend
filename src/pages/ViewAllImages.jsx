import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../constants.js";
import { MdClose } from "react-icons/md";
const ViewAllImages = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: token,
        };
        const response = await axios.get(
          `${BASE_URL}/admin/images`,
          { headers }
        );
        setImages(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchImages();
  }, []);

  const deleteImage = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: token,
      };
      await axios.delete(`${BASE_URL}/admin/images/${id}`, {
        headers,
      });
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Image upload 
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [success, setSuccess] = useState(null);
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);

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
  // Image upload end

  return (
    <div className="flex-grow flex flex-col w-full min-h-screen">
      <div className="flex-grow bg-white shadow-md rounded-md p-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 ">
              All Power Bi Dashboards
            </h2>
          </div>
          <div>
            <button className="bg-blue-500 text-white py-2.5 mb-2 mt-2 rounded-md hover:bg-blue-600 w-full xs:w-28 sm:w-32 "
                  onClick={()=> setFilterPopupVisible(true)}
                  >Add New Dashboard
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead className="bg-gray-50">
              <tr>
                {/* <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th> */}
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image._id} className="border-b last:border-none">
                  {/* <td className="py-4 px-6">
                    <iframe
                      title={image.name}
                      className="w-32 h-32 rounded-md shadow-sm"
                      src={image.imageURL}
                      allowFullScreen
                    ></iframe>
                  </td> */}
                  <td className="py-4 px-6 text-gray-700">{image.name}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(image.createdAt).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => deleteImage(image._id)}
                      className="text-red-500 hover:text-red-700 bg-red-200 p-2 rounded-full transition duration-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filterPopupVisible && (
          <div className="absolute top-0 left-0 h-screen w-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white  p-4 rounded-md  flex flex-col  md:w-5/12 md:gap-4 ">
              <div className=" w-full  mx-auto p-7 bg-white rounded-md ">
                  <div className="flex justify-between ">  
                    <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Dashboard Details</h1>
                    <div>
                          <MdClose
                            onClick={() => setFilterPopupVisible(false)}
                            className=" text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
                          />
                    </div>
                  </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Dashboard Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Image Name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Dashboard URL</label>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllImages;
