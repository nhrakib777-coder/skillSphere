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

  // 📦 Load enrolled courses safely
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = JSON.parse(localStorage.getItem("enrolled")) || [];
      setEnrolledCourses(stored);
    } catch (err) {
      setEnrolledCourses([]);
    }
  }, []);

  if (loading) return <Loader />;

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  // 🧠 FIXED: correct Firebase/NextAuth field + cache busting
  const safeImage = user?.photoURL
    ? `${user.photoURL}?t=${user.updatedAt || Date.now()}`
    : "https://i.pravatar.cc/100";

  // ❌ Remove course handler
  const handleRemove = (id) => {
    const updated = enrolledCourses.filter((c) => c.id !== id);
    setEnrolledCourses(updated);
    localStorage.setItem("enrolled", JSON.stringify(updated));
    toast.success("Course removed ❌");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">

      {/* 🌟 PROFILE CARD */}
      <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-2xl rounded-2xl p-6 text-center">

        <Image
          src={safeImage}
          alt="Profile"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full mx-auto border-4 border-primary/30 object-cover"
        />

        <h2 className="text-2xl font-bold mt-4">
          {user?.displayName || user?.name || "Anonymous"}
        </h2>

        <p className="text-gray-500">{user?.email}</p>

        {/* INFO */}
        <div className="mt-6 text-left space-y-2 text-sm">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {user?.displayName || user?.name || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
        </div>

        {/* UPDATE BUTTON */}
        <Link
          href="/update-profile"
          className="mt-6 inline-block w-full py-3 rounded-full bg-primary text-white hover:scale-105 transition"
        >
          Update Profile ✏️
        </Link>
      </div>

      {/* 📚 ENROLLED COURSES */}
      <div className="mt-12">

        <h3 className="text-2xl font-bold mb-6">
          My Enrolled Courses
        </h3>

        {/* EMPTY STATE */}
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-16 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl">
            <p className="text-gray-500">No courses enrolled yet 😢</p>
            <Link
              href="/courses"
              className="text-primary font-semibold mt-2 inline-block"
            >
              Browse Courses →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="flex gap-4 items-center p-4 rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-lg hover:scale-[1.02] transition"
              >

                <Image
                  src={course.image || "https://via.placeholder.com/80"}
                  alt={course.title}
                  width={80}
                  height={60}
                  className="rounded-xl object-cover w-20 h-16"
                />

                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.instructor}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(course.id)}
                  className="text-red-500 text-sm hover:underline"
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