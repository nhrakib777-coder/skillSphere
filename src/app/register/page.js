"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); // we reuse login for fake system
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // fake registration (no backend)
      login(email, password); // auto login after register

      toast.success("Registered successfully!");
      router.push("/profile");
    } catch (e) {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <form onSubmit={handleRegister} className="space-y-3 mt-4">
            <input
              className="input input-bordered w-full"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="input input-bordered w-full"
              placeholder="Profile Image URL"
              onChange={(e) => setImage(e.target.value)}
            />

            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}