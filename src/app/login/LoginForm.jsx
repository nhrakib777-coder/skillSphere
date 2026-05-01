"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    toast.success("Login Success!");
    router.push(redirect);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 mt-4">
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="btn btn-primary w-full">
        Login
      </button>
    </form>
  );
}