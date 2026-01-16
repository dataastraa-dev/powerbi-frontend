import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BASE_URL } from "../constants.js";

const Login = ({ setUser }) => {
  const [loginObj, setLoginObj] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginObj({ ...loginObj, [name]: value });
  };

  const onLogin = async () => {
    console.log("Login", loginObj);

    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, loginObj);
      console.log(data.data);

      if (!data.success) {
        setError(data.message);
      } else {
        localStorage.setItem("token", data.data.token); // Save token to localStorage
        const decodedToken = jwtDecode(data.data.token); // Decode the JWT
        setUser(decodedToken);
        if (decodedToken.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user");
        }
      }
      setLoginObj({ email: "", password: "" });
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full md:w-1/2 p-8">
        <div className="mb-8 text-center">
          <img src="assets/images/newlogo.png" alt="Logo" className="mx-auto w-32 h-auto object-contain"/>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Dashboard Portal
          </h2>
          <p className="mb-4 text-gray-600">Please sign in to your account</p>
        </div>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              value={loginObj.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={loginObj.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="password"
            />
          </div>
          <button
            type="button"
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
            onClick={onLogin}
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      <div className="hidden md:block w-full md:w-1/2 bg-gray-600 text-white">
        <div className="flex flex-col items-center justify-center h-full">
          <img src="assets/images/conference.jpg" alt="Logo" className="mx-auto w-96 h-auto" />
          {/* <img src="assets/images/newlogo.png" alt="Logo" className="mx-auto mb-6 w-32 md:w-40 lg:w-48 object-contain" /> */}
          {/* <h2 className="text-3xl font-bold mb-4">DataAstraa LLP</h2> */}
          {/* <p className="mb-6">
            Add your organization's description here.
          </p> */}
          {/* <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 p-3">17k</div>
            <span className="ml-4">Add your organization's impact statement here.</span>
          </div> */}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
