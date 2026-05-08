"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //  LOGIN — ✅ CUSTOM ERROR HANDLING ADDED
  const login = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      //  CUSTOM FRIENDLY ERROR MESSAGES
      if (error.code === "auth/user-not-found") {
        throw new Error("You are not registered. Please create an account first.");
      }
      if (error.code === "auth/wrong-password") {
        throw new Error("Incorrect password. Please try again.");
      }
      if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email format.");
      }
      if (error.code === "auth/network-request-failed") {
        throw new Error("Network error. Check your internet.");
      }
      // Default fallback
      throw new Error("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  //  REGISTER
  const register = async (name, email, password, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      await signOut(auth);
      setUser(null);

      return userCredential;
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        throw new Error("Email is already registered.");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //  GOOGLE LOGIN
  const googleLogin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      throw new Error("Google login failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  //  LOGOUT
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  //  UPDATE USER PROFILE
  const updateUser = async (name, photo) => {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });

    setUser((prev) => ({
      ...prev,
      displayName: name,
      photoURL: photo,
    }));
  };

  const authInfo = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
    updateUser,
    isLoggedIn: !!user,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

//  Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}