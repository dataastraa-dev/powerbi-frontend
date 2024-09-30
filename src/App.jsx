import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ViewUsers from "./pages/ViewUsers";
import ViewImages from "./pages/ViewAllImages";
import ProtectedRoute from "./components/ProtectedRoute";
import {jwtDecode} from "jwt-decode";
import UserCreationCard from "./components/UserCreationCard";

const App = () => {
  const [user, setUser] = useState(null);



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode payload of JWT
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, []);

  return (
    <>
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? (
              <Login setUser={setUser} />
            ) : user.role === "Admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/user" />
            )
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute user={user} role="Admin">
              <AdminRoutes 
                user={user}
                
                />
                
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute user={user} role="User">
              <UserDashboard  user={user}/>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </>
  );
};

const AdminRoutes = ({user, setIsOpen}) => {


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Routes>
      <Route 
        path="dashboard" 
        element={
        <AdminDashboard 
        user={user}
        toggleSidebar={toggleSidebar}
        
        />
        } />
      <Route 
        path="view-users" 
        element={
        <ViewUsers 
        toggleSidebar={toggleSidebar}
        />} />

      <Route 
        path="view-images" 
        element={
        <ViewImages 
        toggleSidebar={toggleSidebar}
        />} />

      <Route 
        path="create-user" 
        element={
        <UserCreationCard 
        toggleSidebar={toggleSidebar}
        />} />
      
    </Routes>
  );
};

export default App;
