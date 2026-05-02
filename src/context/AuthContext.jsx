"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  // 🔒 Validate image URL
  const getSafeImage = (image) => {
    if (
      image &&
      (image.startsWith("https://i.ibb.co") ||
        image.startsWith("https://images.unsplash.com") ||
        image.startsWith("https://randomuser.me"))
    ) {
      return image;
    }
    return "https://via.placeholder.com/150";
  };

  // 🔄 Load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        const safeUser = {
          ...parsedUser,
          image: getSafeImage(parsedUser.image),
        };

        setUser(safeUser);
        setStatus("authenticated");
      } catch {
        localStorage.removeItem("user");
        setStatus("unauthenticated");
      }
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  // 🔐 Login
  const login = async (email, password) => {
    setStatus("loading");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          setStatus("unauthenticated");
          return reject("Invalid credentials");
        }

        const fakeUser = {
          name: "Rakib",
          email,
          image: "https://i.ibb.co/4pDNDk1/avatar.png",
        };

        setUser(fakeUser);
        localStorage.setItem("user", JSON.stringify(fakeUser));
        setStatus("authenticated");

        resolve(fakeUser);
      }, 800);
    });
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setStatus("unauthenticated");
  };

  // ✏️ Update user safely
  const updateUser = (name, image) => {
    const updatedUser = {
      ...user,
      name,
      image: getSafeImage(image),
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        status,
        isLoggedIn: status === "authenticated",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};