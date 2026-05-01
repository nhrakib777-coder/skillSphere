"use client";
import { useProtectedRoute } from "@/utils/protectedRoute";
import Loader from "@/components/Loader";
import Image from "next/image";
import courses from "@/data/courses.json";
import { useParams } from "next/navigation";

export default function CourseDetails() {
  const loading = useProtectedRoute();
  const { id } = useParams();
  const course = courses.find(c => c.id == id);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="card bg-base-100 shadow-xl">
        <figure><Image src={course.image} alt={course.title} width={800} height={256} className="w-full h-64 object-cover" /></figure>
        <div className="card-body">
          <h2 className="text-3xl font-bold">{course.title}</h2>
          <p>Instructor: {course.instructor}</p>
          <p>Duration: {course.duration}</p>
          <p>Level: {course.level}</p>
          <p className="text-lg mt-4">{course.description}</p>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Curriculum</h3>
            <ul className="list-disc pl-5">
              <li>Introduction</li>
              <li>Core Concepts</li>
              <li>Practical Projects</li>
              <li>Final Assessment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}