import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants.js";
import { useSetRecoilState } from "recoil";
import { isAdminLoggedIn, adminAtom } from "../recoil/adminAtom.js";

const AdminRegister = () => {
  const [registerObj, setRegisterObj] = useState({
    email: "",
    password: "",
    name: "",
  });
  const setIsLoggedIn = useSetRecoilState(isAdminLoggedIn);
  const setAdmin = useSetRecoilState(adminAtom);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterObj({ ...registerObj, [name]: value });
  };

  const onRegister = async () => {
    console.log("Register", registerObj);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/register`,
        registerObj
      );
      console.log(data.data);

      if (data.success === false) {
        setIsLoggedIn(false);
        console.log(data);
        alert(data.message);
      } else {
        const adminObj = {
          email: data.data.email,
          name: data.data.name,
          id: data.data.id,
          role: data.data.role,
        };
        localStorage.setItem("token", data.data.token);
        setAdmin(adminObj);
        setIsLoggedIn(true);
        navigate("/");
      }

      setRegisterObj({ email: "", password: "", name: "" });
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6">Welcome!</h1>
          <p className="mb-4">Register</p>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={registerObj.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
                name="name"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                value={registerObj.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
                name="email"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={registerObj.password}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
                name="password"
              />
            </div>
            <div>
              <button
                type="button"
                className="w-full p-3 bg-blue-500 text-white rounded"
                onClick={onRegister}
              >
                Register
              </button>
            </div>
          </form>
          <p className="my-4">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 cursor-pointer">
              Sign in here!
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full p-3">
        <img
          src="https://i.pinimg.com/474x/7a/9e/ce/7a9ecebe09e04e3cbb76a4ce7e4e6380.jpg"
          className="object-cover w-full h-full rounded-3xl"
          alt="Register"
        />
      </div>
    </div>
  );
};

export default AdminRegister;
