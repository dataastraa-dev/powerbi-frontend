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
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Welcome Back!
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
      <div className="hidden md:block w-full md:w-1/2 bg-gray-600 text-white p-8">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl font-bold mb-4">Your Organization Name</h2>
          <p className="mb-6">
            Add your organization's description here.
          </p>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 p-3">17k</div>
            <span className="ml-4">Add your organization's impact statement here.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  

    // <div className="w-screen h-screen flex flex-col md:flex-row">
    //   <div className="w-full md:w-1/2 h-1/2 md:h-full p-3">
    //     <img
    //       src="https://i.pinimg.com/236x/3b/59/f9/3b59f9d183b398919d23d6b0c6f7bfc7.jpg"
    //       className="object-cover w-full h-full rounded-3xl"
    //       alt="SignIn"
    //     />
    //   </div>

    //   <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
    //     <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
    //       <h1 className="text-3xl font-bold mb-6 text-gray-800">
    //         Welcome Back!
    //       </h1>
    //       <p className="mb-4 text-gray-600">Please sign in to your account</p>
    //       <form>
    //         <div className="mb-4">
    //           <input
    //             type="text"
    //             placeholder="Email"
    //             value={loginObj.email}
    //             onChange={handleInputChange}
    //             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //             name="email"
    //           />
    //         </div>
    //         <div className="mb-6">
    //           <input
    //             type="password"
    //             placeholder="Password"
    //             value={loginObj.password}
    //             onChange={handleInputChange}
    //             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //             name="password"
    //           />
    //         </div>
    //         <div>
    //           <button
    //             type="button"
    //             className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    //             onClick={onLogin}
    //           >
    //             Sign In
    //           </button>
    //         </div>
    //       </form>
    //       {error && <p className="text-red-500 mt-4">{error}</p>}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
