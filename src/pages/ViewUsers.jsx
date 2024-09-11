import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import UserList from "../components/UsersComponents/UserList";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-100 w-full flex flex-col mt-8">
      <div className="flex-grow p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Users</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <UserList users={users} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default ViewUsers;
