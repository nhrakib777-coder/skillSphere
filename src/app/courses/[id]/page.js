"use client";

import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/utils/protectedRoute";
import Loader from "@/components/Loader";
import Image from "next/image";
import courses from "@/data/courses.json";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function CourseDetails() {
  const loading = useProtectedRoute();
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // 🔍 Load course
  useEffect(() => {
    if (!id) return;

    const found = courses.find((c) => c.id == id);
    setCourse(found);
  }, [id]);

  // 🔑 user-specific key
  const getKey = () => {
    if (!user) return null;
    return `enrolled_${user.email || user.uid}`;
  };

  // 🔥 Check enrollment
  useEffect(() => {
    if (!course || !user) return;

    try {
      const key = getKey();
      const enrolled = JSON.parse(localStorage.getItem(key)) || [];

      const exists = enrolled.some((c) => c.id === course.id);
      setIsEnrolled(exists);
    } catch (err) {
      setIsEnrolled(false);
    }
  }, [course, user]);

  if (loading) return <Loader />;

  if (!course) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-500">
          Course not found 😢
        </h2>
      </div>
    );
  }

  // 🚀 ENROLL FUNCTION (FIXED + REDIRECT)
  const handleEnroll = () => {
    if (!user) {
      toast.error("Please login first");

      // 🔥 redirect to login page
      router.push("/login");

      return;
    }

    const key = getKey();
    const enrolled = JSON.parse(localStorage.getItem(key)) || [];

    const already = enrolled.some((c) => c.id === course.id);

    if (already) {
      return toast("Already enrolled!");
    }

    const updated = [...enrolled, course];
    localStorage.setItem(key, JSON.stringify(updated));

    setIsEnrolled(true);
    toast.success(`Enrolled in ${course.title} 🎉`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">

      <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-2xl rounded-2xl overflow-hidden">

        {/* Course Image */}
        <Image
          src={course.image || "https://via.placeholder.com/800x400"}
          alt={course.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />

        {/* Content */}
        <div className="p-6 text-gray-800 dark:text-gray-200">

          {/* Title */}
          <h2 className="text-3xl font-bold mb-2">
            {course.title}
          </h2>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>👨‍🏫 {course.instructor}</span>
            <span>⏱ {course.duration}</span>
            <span>📊 {course.level}</span>
            <span>⭐ {course.rating}</span>
          </div>

          {/* Description */}
          <p className="text-lg mb-6">
            {course.description}
          </p>

          {/* Curriculum */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              📚 Curriculum
            </h3>

            <ul className="space-y-2">
              <li>✔ Introduction</li>
              <li>✔ Core Concepts</li>
              <li>✔ Hands-on Projects</li>
              <li>✔ Final Assessment</li>
            </ul>
          </div>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            disabled={isEnrolled}
            className={`w-full mt-8 py-3 rounded-full font-semibold transition ${
              isEnrolled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:scale-105 hover:shadow-lg"
            }`}
          >
            {isEnrolled ? "Enrolled ✅" : "Enroll Now 🚀"}
          </button>

        </div>
      </div>
    </div>
  );
}