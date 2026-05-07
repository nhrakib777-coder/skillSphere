"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Image from "next/image";
import courses from "@/data/courses.json";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  //  PROTECTED ROUTE: IF NOT LOGGED IN → REDIRECT TO LOGIN
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to view this course");
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  //  Load course
  useEffect(() => {
    if (!id) return;

    const found = courses.find((c) => c.id == id);
    setCourse(found);
    setLoading(false);
  }, [id]);

  //  Get enrollment key
  const getKey = () => {
    if (!user) return null;
    return `enrolled_${user.email || user.uid}`;
  };

  //  Check enrollment status
  useEffect(() => {
    if (!course || !user) return;

    try {
      const key = getKey();
      const enrolledList = JSON.parse(localStorage.getItem(key)) || [];
      const alreadyEnrolled = enrolledList.some((c) => c.id === course.id);
      setIsEnrolled(alreadyEnrolled);
    } catch (err) {
      setIsEnrolled(false);
    }
  }, [course, user]);

  // SHOW LOADER WHILE CHECKING
  if (!isLoggedIn || loading) return <Loader />;

  // COURSE NOT FOUND
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-red-500">Course not found</h2>
      </div>
    );
  }

  //  ENROLL COURSE
  const handleEnroll = () => {
    const key = getKey();
    const enrolledList = JSON.parse(localStorage.getItem(key)) || [];
    const alreadyExists = enrolledList.some((c) => c.id === course.id);

    if (alreadyExists) {
      toast("Already enrolled!");
      return;
    }

    const updatedList = [...enrolledList, course];
    localStorage.setItem(key, JSON.stringify(updatedList));
    setIsEnrolled(true);
    toast.success(`Successfully enrolled in ${course.title} 🎉`);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Course Image */}
        <Image
          src={course.image}
          alt={course.title}
          width={800}
          height={450}
          className="w-full h-[300px] object-cover"
          priority
        />

        <div className="p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{course.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-5 text-gray-500 mb-6">
            <span>👨‍🏫 {course.instructor}</span>
            <span>⏱ {course.duration}</span>
            <span>📊 {course.level}</span>
            <span>⭐ {course.rating}</span>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">{course.description}</p>

          {/* Curriculum */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">📚 Course Curriculum</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Introduction</li>
              <li>✅ Core Fundamentals</li>
              <li>✅ Practical Projects</li>
              <li>✅ Quizzes & Assignments</li>
              <li>✅ Final Certification</li>
            </ul>
          </div>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            disabled={isEnrolled}
            className={`w-full py-4 rounded-full text-lg font-semibold transition-all ${
              isEnrolled
                ? "bg-green-100 text-green-700 cursor-not-allowed"
                : "bg-primary text-white hover:scale-105 hover:shadow-xl"
            }`}
          >
            {isEnrolled ? "✅ Already Enrolled" : "🚀 Enroll Now"}
          </button>
        </div>
      </div>
    </div>
  );
}