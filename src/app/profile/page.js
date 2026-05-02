"use client";

import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/utils/protectedRoute";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function Profile() {
  const loading = useProtectedRoute();
  const { user } = useAuth();

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // 🔥 Load enrolled courses
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("enrolled")) || [];
    setEnrolledCourses(stored);
  }, []);

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
      : "https://i.pravatar.cc/100";

  // 🔥 Remove course
  const handleRemove = (id) => {
    const updated = enrolledCourses.filter((c) => c.id !== id);
    setEnrolledCourses(updated);
    localStorage.setItem("enrolled", JSON.stringify(updated));
    toast("Course removed ❌");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">

      {/* PROFILE CARD */}
      <div className="card bg-base-100 shadow-xl text-center p-6 rounded-lg">

        <Image
          src={safeImage}
          alt="Profile"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full mx-auto border-4 border-primary/20 object-cover"
        />

        <h2 className="text-2xl font-bold mt-4">
          {user.name || "Anonymous"}
        </h2>

        <p className="text-gray-500">{user.email}</p>

        <div className="divider my-4"></div>

        <div className="text-left space-y-2 text-sm">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>

        <div className="mt-6">
          <Link
            href="/update-profile"
            className="btn w-full rounded-full bg-blue-600 hover:bg-blue-700 p-2 text-white"
          >
            Update Profile
          </Link>
        </div>
      </div>

      {/* 🔥 ENROLLED COURSES */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">
          My Enrolled Courses
        </h3>

        {enrolledCourses.length === 0 ? (
          <p className="text-gray-500">
            You haven’t enrolled in any course yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="flex gap-4 items-center bg-white p-3 rounded-lg shadow"
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  width={80}
                  height={60}
                  className="rounded object-cover w-20 h-16"
                />

                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.instructor}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(course.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}