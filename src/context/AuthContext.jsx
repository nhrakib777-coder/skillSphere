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

  // 🔥 Auth Listener (WORKS PERFECTLY)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔐 LOGIN — FIXED ✅
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      setUser(userCredential.user); // ✅ THIS WAS MISSING!
      return userCredential;
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        throw new Error("You are not registered. Please create an account first.");
      }
      if (error.code === "auth/wrong-password") {
        throw new Error("Incorrect password. Please try again.");
      }
      throw new Error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 📝 REGISTER — FIXED (auto logout AFTER creation, safe) ✅
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

      // ✅ Safe logout after registration
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

  // 🔵 GOOGLE LOGIN — FIXED ✅
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // ✅ THIS WAS MISSING!
      return result;
    } catch (error) {
      throw new Error("Google login failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ UPDATE PROFILE
  const updateUser = async (name, photo) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    setUser({ ...auth.currentUser });
  };

  const authInfo = {
    user: user ? {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    } : null,
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

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}