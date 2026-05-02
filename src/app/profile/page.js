"use client";

import { useProtectedRoute } from "@/utils/protectedRoute";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  const loading = useProtectedRoute();
  const { user } = useAuth();

  if (loading) return <Loader />;

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  // ✅ Safe image fallback
  const safeImage =
    user.image &&
      (user.image.startsWith("https://i.ibb.co") ||
        user.image.startsWith("https://images.unsplash.com") ||
        user.image.startsWith("https://randomuser.me"))
      ? user.image
      : "https://via.placeholder.com/100";

  return (
    <div className="container mx-auto px-4 py-12 max-w-md ">
      <div className="card bg-base-100 shadow-xl text-center p-6 rounded-lg ">

        {/* Avatar */}
        <Image
          src={safeImage}
          alt="Profile"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full mx-auto border-4 border-primary/20 object-cover"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold mt-4">
          {user.name || "Anonymous"}
        </h2>

        {/* Email */}
        <p className="text-gray-500">{user.email}</p>

        <div className="divider my-4"></div>

        {/* Info */}
        <div className="text-left space-y-2 text-sm ">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>

        {/* Update Button */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/update-profile"
            className="btn w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
          >
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}