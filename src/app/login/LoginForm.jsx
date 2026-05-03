"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const { login, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const redirect = "/";

  // 🔐 EMAIL LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }

    try {
      setLoading(true);

      await login(email.trim(), password);

      toast.success("Login successful 🎉");

      router.replace(redirect);
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      const code = err?.code || "";
      let message = "Login failed";

      switch (code) {
        case "auth/invalid-credential":
          message = "Invalid email or password";
          break;
        case "auth/user-not-found":
          message = "User not found";
          break;
        case "auth/wrong-password":
          message = "Wrong password";
          break;
        case "auth/too-many-requests":
          message = "Too many attempts. Try later.";
          break;
        case "auth/invalid-email":
          message = "Invalid email format";
          break;
        default:
          message = err?.message || "Login failed";
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 GOOGLE LOGIN (FIXED)
  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await googleLogin();

      toast.success("Google login successful 🎉");

      router.replace(redirect);

    } catch (err) {
      console.error("GOOGLE LOGIN ERROR:", err);

      // ✅ IMPORTANT FIX (ignore this error)
      if (err?.code === "auth/popup-closed-by-user") {
        return;
      }

      toast.error(err?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 mt-6">

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full p-2 rounded-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full p-2 rounded-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* LOGIN BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="btn bg-blue-600 text-white w-full p-2 rounded-full"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* GOOGLE LOGIN */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="btn w-full border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        {loading ? "Please wait..." : "Continue with Google"}
      </button>

    </form>
  );
}