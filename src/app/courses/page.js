"use client";
import { useState } from "react";
import courses from "@/data/courses.json";
import CourseCard from "@/components/CourseCard";

export default function AllCourses() {
  const [search, setSearch] = useState("");
  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">All Courses</h2>
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search courses..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
}