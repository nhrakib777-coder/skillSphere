"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const { login, status } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(email, password);

      toast.success("Login successful 🎉");
      router.push(redirect);
    } catch (err) {
      toast.error(err || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 mt-4 p-4 rounded-lg ">

      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full p-2 rounded-full outline-none focus:ring-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full p-2 rounded-full outline-none focus:ring-2 "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        className="btn bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full w-full"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Divider */}
      <div className="divider text-center">OR</div>

      {/* Google Login (UI for now) */}
      <button
        type="button"
        onClick={() => toast("Google login coming soon")}
        className="btn w-full border"
      >
        Continue with Google
      </button>
    </form>
  );
}