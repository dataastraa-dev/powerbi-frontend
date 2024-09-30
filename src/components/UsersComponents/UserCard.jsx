import React, { useState } from "react";
import EditUserModal from "../EditUserModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constants.js";

const UserCard = ({ user, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);
  const [images, setImages] = useState([]);

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
      console.error("Error fetching images:", error.message);
    }
  };

  const handleEditClick = () => {
    fetchImages();
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: token };
      await axios.delete(`${BASE_URL}/user/delete/${userData._id}`, { headers });
      onDelete(userData._id);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleUpdate = (updatedUser) => {
    setUserData(updatedUser);
  };

  return (
    <>
      <tr className="border-b">
        <td className="py-4 px-6">{userData.name}</td>
        <td className="py-4 px-6">{userData.email}</td>
        <td className="py-4 px-6">
        {userData.images
          .map((image) => (
            <span 
              href={`${image.imageURL}`}
              key={image._id}
              target="_blank"
              rel="noopener noreferrer"
              // className="hover:text-blue-600" 
            >
              {image.name}
            </span>
          ))
          .reduce((acc, curr, index) => {
            if (index === 0) {
              return [curr];
            } else {
              return [...acc, ', ', curr];
            }
          }, [])}
        </td>
        <td className="py-4 px-6 text-right flex space-x-2 justify-end">
          <button
            onClick={handleEditClick}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={handleDeleteClick}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </td>
      </tr>
      {isEditing && (
        <EditUserModal
          user={userData}
          images={images}
          onClose={() => setIsEditing(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default UserCard;
