import React, { createContext, useState } from "react";
import UserService from "../services/UserService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserById = async (userId) => {
    try {
      const response = UserService.getUserById(userId);
      setUser(response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserById }}>
      {children}
    </UserContext.Provider>
  );
};
