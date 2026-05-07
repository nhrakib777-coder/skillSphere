"use client";

import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/utils/protectedRoute";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Profile() {
  const loading = useProtectedRoute();
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  //  user-specific key
  const getKey = () => {
    if (!user) return null;
    return `enrolled_${user.email || user.uid}`;
  };

  //  Load enrolled courses
  useEffect(() => {
    if (!user) return;

    try {
      const key = getKey();
      const stored = JSON.parse(localStorage.getItem(key)) || [];
      setEnrolledCourses(stored);
    } catch (err) {
      setEnrolledCourses([]);
    }
  }, [user]);

  if (loading) return <Loader />;

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  //profile image fallback
  const profileImage = user?.photoURL || "https://ui-avatars.com/api/?name=User&background=random";

  // Remove course
  const handleRemove = (id) => {
    const key = getKey();
    const updated = enrolledCourses.filter((c) => c.id !== id);
    setEnrolledCourses(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    toast.success("Course removed ❌");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">

      {/* 👤 PROFILE CARD */}
      <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-2xl rounded-2xl p-6 text-center">

        {/* USE NORMAL img*/}
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-primary/30 object-cover"
        />

        <h2 className="text-2xl font-bold mt-4">
          {user?.displayName || "Anonymous"}
        </h2>

        <p className="text-gray-500">{user?.email}</p>

        <div className="mt-6 text-left space-y-2 text-sm">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {user?.displayName || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
        </div>

        <Link
          href="/update-profile"
          className="mt-6 inline-block w-full py-3 rounded-full bg-primary text-white hover:scale-105 transition"
        >
          Update Profile ✏️
        </Link>
      </div>

      {/*  ENROLLED COURSES */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">My Enrolled Courses</h3>

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
                {/*  COURSE IMAGE */}
                <img
                  src={course.image || "https://via.placeholder.com/80"}
                  alt={course.title}
                  className="rounded-xl object-cover w-20 h-16"
                />

                <div className="flex-1">
                  <p className="font-semibold text-sm">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.instructor}</p>
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