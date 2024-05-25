import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const user = await AuthService.checkAuthentication();
      if (user) {
        Cookies.set("user", JSON.stringify(user));
        setUser(user);
      } else {
        const cookieUser = Cookies.get("user");
        if (cookieUser !== undefined) {
          setUser(JSON.parse(cookieUser));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const data = await AuthService.loginUser({ email, password });
      Cookies.set("user", JSON.stringify(data.user));
      setUser(data.user.dataValues);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const googleLogin = async ({ email, password }) => {};

  const logoutUser = async () => {
    try {
      await AuthService.logoutUser();
      Cookies.remove("user");
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, checkAuth, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
