"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login function
  const login = (email, password) => {
    // fake user (assignment purpose)
    const fakeUser = {
      name: "Rakib",
      email: email,
      photo: "https://i.ibb.co/4pDNDk1/avatar.png",
    };

    setUser(fakeUser);
  };

  // logout function
  const logout = () => {
    setUser(null);
  };

  // update profile
  const updateUser = (name, photo) => {
    setUser((prev) => ({
      ...prev,
      name,
      photo,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);