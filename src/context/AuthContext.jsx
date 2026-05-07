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

  //  Auth State Listener (RELIABLE — DO NOT MANUALLY SET USER ELSEWHERE)
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

  //  LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email.trim(), password);
    } finally {
      setLoading(false);
    }
  };

  //  REGISTER 
  const register = async (name, email, password, photoURL) => {
    setLoading(true);
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      // Update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      //  FORCE LOGOUT 
      await signOut(auth);
      setUser(null);

      return userCredential;
    } catch (error) {
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