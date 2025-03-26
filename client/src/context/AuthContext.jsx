import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  // Initialize user state (could be null or data from localStorage)
  const [user, setUser] = useState(null);

  // Rehydrate user state on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to log in a user using Axios
  const loginUser = async (loginData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", loginData);
      // Save token in localStorage
      localStorage.setItem("token", response.data.token);
      // Save user data in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Update user state
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
      throw error;
    }
  };

  // Function to register a new user using Axios
  const registerUser = async (registerData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", registerData);
      // Save token in localStorage
      localStorage.setItem("token", response.data.token);
      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Update user state
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Function to log out user
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
