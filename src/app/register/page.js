"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, updateUser } = useAuth();
  const router = useRouter();

  // ✅ validation
  const isValidImage = (url) => {
    return (
      url.startsWith("https://i.ibb.co") ||
      url.startsWith("https://images.unsplash.com") ||
      url.startsWith("https://randomuser.me")
    );
  };

  // 🔥 real-time validation state
  const imageError =
    image && !isValidImage(image)
      ? "Use a valid image URL (i.ibb.co / Unsplash)"
      : "";

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (imageError) {
      return toast.error(imageError);
    }

    try {
      setLoading(true);

      await login(email, password);

      updateUser(
        name || "Anonymous",
        image && isValidImage(image)
          ? image
          : "https://i.pravatar.cc/150"
      );

      toast.success("Registration successful 🎉");
      router.push("/profile");

    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-4 rounded-lg">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-500 text-sm">
            Join SkillSphere and start learning today
          </p>

          {/* 🔥 Image Preview */}
          <div className="flex justify-center mt-3">
            <Image
              src={
                image && isValidImage(image)
                  ? image
                  : "https://i.pravatar.cc/100"
              }
              alt="Preview"
              width={80}
              height={80}
              className="rounded-full object-cover border"
            />
          </div>

          <form onSubmit={handleRegister} className="space-y-3 mt-4">

            {/* Name */}
            <input
              className="input input-bordered w-full p-2 rounded-full outline-none focus:ring-2"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}
            <input
              type="email"
              className="input input-bordered w-full p-2 rounded-full outline-none focus:ring-2"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Image URL */}
            <div>
              <input
                className={`input input-bordered w-full p-2 rounded-full outline-none focus:ring-2 ${
                  imageError ? "border-red-500" : ""
                }`}
                placeholder="Profile Image URL (i.ibb.co / Unsplash)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              {/* 🔥 Live Error */}
              {imageError && (
                <p className="text-red-500 text-xs mt-1">
                  {imageError}
                </p>
              )}
            </div>

            {/* Password */}
            <input
              type="password"
              className="input input-bordered w-full p-2 rounded-full outline-none focus:ring-2"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            <div className="divider text-center">OR</div>

            <button
              type="button"
              onClick={() => toast("Google signup coming soon")}
              className="btn w-full border"
            >
              Continue with Google
            </button>

          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}