"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ GET GOOGLE LOGIN FUNCTION FROM AUTH CONTEXT
  const { login, googleLogin } = useAuth();
  const router = useRouter();

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN HANDLER
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();
      toast.success("Google login successful! 🎉");
      router.push("/");
    } catch (err) {
      toast.error("Google login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md bg-white shadow-2xl p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-primary mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Login to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-full bg-primary text-white hover:scale-105 transition-all disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/*  DIVIDER */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <p className="text-sm text-gray-500">or</p>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/*  GOOGLE LOGIN BUTTON  */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full p-3 rounded-full border border-gray-400 bg-white text-gray-800 hover:bg-gray-100 transition-all font-medium disabled:opacity-70"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}