import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditUserModal from "../EditUserModal";

const UserList = ({ users, handleDeleteClick, fetchUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
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

  const handleEditClick = (user) => {
    fetchImages();
    setUserData(user);
    setIsEditing(true);
  };

  const handleUpdate = (updatedUser) => {
    fetchUsers();
    setUserData(updatedUser);
  };

  return (
    <div className="overflow-x-auto ">
      <table className="w-full bg-white ">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-700 uppercase text-sm leading-normal ">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Reports</th>
            <th className="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-black text-md ">
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="py-4 px-6">{user.name}</td>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">
              {user.images
                .map((image) => (
                  <span 
                    href={`${image.imageURL}`}
                    key={image._id}
                    target="_blank"
                    rel="noopener noreferrer"
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
                  onClick={() => {handleEditClick(user)}}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <EditUserModal
          user={userData}
          images={images}
          onClose={() => setIsEditing(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default UserList;
