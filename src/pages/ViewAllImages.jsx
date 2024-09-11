import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

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
          "http://localhost:8000/api/admin/images",
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
      await axios.delete(`http://localhost:8000/api/admin/images/${id}`, {
        headers,
      });
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="flex-grow flex flex-col w-full">
      <div className="flex-grow bg-white shadow-md rounded-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-12">
          All Power Bi Dashboards
        </h2>
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
      </div>
    </div>
  );
};

export default ViewAllImages;
