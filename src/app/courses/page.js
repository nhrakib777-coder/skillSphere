"use client";

import { useState, useMemo } from "react";
import courses from "@/data/courses.json";
import CourseCard from "@/components/CourseCard";

export default function AllCourses() {
  const [search, setSearch] = useState("");

  // ✅ optimized filtering
  const filteredCourses = useMemo(() => {
    return courses.filter((c) =>
      `${c.title} ${c.category} ${c.instructor}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="container mx-auto px-4 py-12">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        All Courses
      </h2>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6 relative">

        <input
          type="text"
          placeholder="Search by title, category, instructor..."
          className="input input-bordered w-full pr-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Clear Button */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-2 text-gray-400 hover:text-red-500"
          >
            ✕
          </button>
        )}
      </div>

      {/* Result Count */}
      <p className="text-center text-gray-500 mb-8">
        {filteredCourses.length} course(s) found
      </p>

      {/* Empty State */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold text-gray-600">
            No courses found 😢
          </h3>
          <p className="text-gray-400 mt-2">
            Try a different keyword
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}