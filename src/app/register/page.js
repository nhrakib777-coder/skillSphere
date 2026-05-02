"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Image from "next/image";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, googleLogin, updateUser } = useAuth();
  const router = useRouter();

  // ✅ validate image URL
  const isValidImage = (url) => {
    return (
      url.startsWith("https://i.ibb.co") ||
      url.startsWith("https://images.unsplash.com") ||
      url.startsWith("https://randomuser.me") ||
      url.startsWith("https://via.placeholder.com")
    );
  };

  const imageError =
    image && !isValidImage(image)
      ? "Use a valid image URL (i.ibb.co / Unsplash)"
      : "";

  // 🔐 Email/Password Register
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

      // 1️⃣ Create user
      const result = await register(email, password);
      const user = result.user;

      // 2️⃣ Update profile safely
      await updateUser(
        name || "Anonymous",
        image && isValidImage(image)
          ? image
          : "https://ui-avatars.com/api/?name=John+Doe&size=100"
      );

      toast.success("Account created successfully 🎉");

      router.push("/profile");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Google Signup
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);

      await googleLogin();

      toast.success("Google signup successful 🎉");

      router.push("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 rounded-lg">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-500 text-sm">
            Join SkillSphere and start learning today
          </p>

          {/* Image Preview */}
          <div className="flex justify-center mt-3">
            <Image
              src={
                image && isValidImage(image)
                  ? image
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent("SkillSphere User")}&background=random`
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
              className="input input-bordered w-full p-2 rounded-full"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              className="input input-bordered w-full p-2 rounded-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Image */}
            <div>
              <input
                className={`input input-bordered w-full p-2 rounded-full ${imageError ? "border-red-500" : ""
                  }`}
                placeholder="Profile Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              {imageError && (
                <p className="text-red-500 text-xs mt-1">
                  {imageError}
                </p>
              )}
            </div>

            {/* Password */}
            <input
              type="password"
              className="input input-bordered w-full p-2 rounded-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn bg-blue-600 hover:bg-blue-700 text-white w-full rounded-full p-2"
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            {/* Divider */}
            <div className="divider text-center">OR</div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="btn w-full   border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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