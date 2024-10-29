import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditUserModal from "../EditUserModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdLockReset } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";

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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangePassword = () => {
    setIsPopupVisible(true);
  };

  const handleSubmitPasswordChange = async () => {
    if (newPassword === confirmPassword && newPassword !== "") {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`${BASE_URL}/users/change-password`, {          
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, userId }),
        });
        if (response.ok) {
          alert("Password changed successfully");
          setIsPopupVisible(false);
        } else {
          alert("Failed to change password");
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    } else if (newPassword !== confirmPassword) {
      alert("Password not Matched.");
    } else {
      alert("InValid Credential");
    }
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
                <button
                  onClick={handleChangePassword}
                  className=" text-xl text-red-500 hover:text-red-700"
                >
                  <MdLockReset />
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Change Password</h2>
              <CloseIcon
                className="cursor-pointer hover:text-red-500 "
                onClick={() => setIsPopupVisible(false)}
              />
            </div>
            <input
              type="password"
              placeholder="Enter New Password"
              className="border p-2 w-full mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border p-2 w-full mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsPopupVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmitPasswordChange}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
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
