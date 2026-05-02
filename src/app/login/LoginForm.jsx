"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 EMAIL LOGIN (FIXED)
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔵 GOOGLE LOGIN
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  // 🚪 LOGOUT
  const logout = () => {
    return signOut(auth);
  };

  // 👀 AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🧠 HOOK
export const useAuth = () => useContext(AuthContext);