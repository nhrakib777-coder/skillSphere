"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import courses from "@/data/courses.json";
import CourseCard from "@/components/CourseCard";

export default function AllCourses() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const filteredCourses = useMemo(() => {
    return courses.filter((c) =>
      `${c.title} ${c.category} ${c.instructor}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="container mx-auto px-4 py-12">

      <h2 className="text-3xl font-bold text-center mb-6">
        All Courses
      </h2>

      {/* Search result text */}
      {search && (
        <p className="text-center text-gray-500 mb-4">
          Showing results for:{" "}
          <span className="font-semibold">"{search}"</span>
        </p>
      )}

      {/* Result count */}
      <p className="text-center text-gray-500 mb-8">
        {filteredCourses.length} course(s) found
      </p>

      {/* Empty */}
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