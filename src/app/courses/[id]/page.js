"use client";

import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/utils/protectedRoute";
import Loader from "@/components/Loader";
import Image from "next/image";
import courses from "@/data/courses.json";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CourseDetails() {
  const loading = useProtectedRoute();
  const { id } = useParams();

  const course = courses.find((c) => c.id == id);

  const [isEnrolled, setIsEnrolled] = useState(false);

  // 🔥 check if already enrolled
  useEffect(() => {
    if (!course) return;

    const enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
    const exists = enrolled.find((c) => c.id === course.id);

    setIsEnrolled(!!exists);
  }, [course]);

  if (loading) return <Loader />;

  if (!course) {
    return <p className="text-center mt-10">Course not found</p>;
  }

  // 🔥 ENROLL FUNCTION (MAIN FIX)
  const handleEnroll = () => {
    const enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

    // ❌ prevent duplicate
    const already = enrolled.find((c) => c.id === course.id);
    if (already) {
      return toast("Already enrolled!");
    }

    const updated = [...enrolled, course];
    localStorage.setItem("enrolled", JSON.stringify(updated));

    setIsEnrolled(true);

    toast.success(`Enrolled in ${course.title} 🎉`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden">

        {/* Image */}
        <figure>
          <Image
            src={course.image}
            alt={course.title}
            width={800}
            height={256}
            className="w-full h-64 object-cover"
          />
        </figure>

        {/* Content */}
        <div className="card-body p-4">
          <h2 className="text-3xl font-bold">{course.title}</h2>

          <p>Instructor: {course.instructor}</p>
          <p>Duration: {course.duration}</p>
          <p>Level: {course.level}</p>

          <p className="text-lg mt-4">{course.description}</p>

          {/* Curriculum */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Curriculum</h3>
            <ul className="list-disc pl-5">
              <li>Introduction</li>
              <li>Core Concepts</li>
              <li>Practical Projects</li>
              <li>Final Assessment</li>
            </ul>
          </div>

          {/* 🔥 Enroll Button */}
          <button
            onClick={handleEnroll}
            disabled={isEnrolled}
            className={`btn w-full rounded-full mt-6 text-white ${
              isEnrolled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEnrolled ? "Enrolled ✅" : "Enroll Now"}
          </button>

        </div>
      </div>
    </div>
  );
}