"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, googleLogin } = useAuth();
  const router = useRouter();

  const isValidImage = (url) => {
    if (!url) return false;
    return (
      url.startsWith("https://i.ibb.co") ||
      url.startsWith("https://images.unsplash.com") ||
      url.startsWith("https://randomuser.me") ||
      url.startsWith("https://via.placeholder.com") ||
      url.startsWith("https://ui-avatars.com")
    );
  };

  const imageError = image && !isValidImage(image)
    ? "Use a valid image URL"
    : "";

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email address");
      return;
    }
    if (!name) {
      toast.error("Please enter your full name");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (imageError) {
      toast.error(imageError);
      return;
    }

    try {
      setLoading(true);

      const profileImage = isValidImage(image)
        ? image
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=random`;

      await register(name, trimmedEmail, password, profileImage);

      toast.success("Registration successful! Please login 🎉");
      router.push("/login");

    } catch (err) {
      console.error("REGISTER ERROR:", err);

      let message = "Registration failed";
      if (err.code === "auth/network-request-failed") {
        message = "Network error! Check your internet.";
      } else if (err.code === "auth/email-already-in-use") {
        message = "Email already in use";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email format";
      } else if (err.code === "auth/weak-password") {
        message = "Password must be at least 6 characters";
      } else {
        message = err.message || "Something went wrong";
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await googleLogin();
      toast.success("Google signup successful 🎉");
      router.push("/");
    } catch (err) {
      console.error("GOOGLE SIGNUP ERROR:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Google signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md bg-white shadow-2xl p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-primary">Create Account</h2>
        <p className="text-center text-gray-500 text-sm mb-4">
          Join SkillSphere and start learning today
        </p>

        <div className="flex justify-center mt-2">
          <img
            src="https://ui-avatars.com/api/?name=User&background=random"
            alt="Profile Preview"
            width={90}
            height={90}
            className="rounded-full object-cover border-2 border-primary/20"
          />
        </div>

        <form onSubmit={handleRegister} className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <div>
            <input
              type="text"
              placeholder="Profile Image URL (Optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={`w-full p-3 rounded-full border ${imageError ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {imageError && (
              <p className="text-red-500 text-xs mt-1">{imageError}</p>
            )}
          </div>

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-full bg-primary text-white hover:scale-105 transition-all disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <div className="divider text-sm text-gray-500 text-center">OR</div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-all disabled:opacity-70"
          >
            {loading ? "Please wait..." : "Continue with Google"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}