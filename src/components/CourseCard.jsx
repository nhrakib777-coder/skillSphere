import Link from "next/link";
import Image from "next/image";

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <div className="card bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">

      {/* Image */}
      <figure className="overflow-hidden">
        <Image
          src={course.image || "https://via.placeholder.com/500x300"}
          alt={course.title || "Course Image"}
          width={500}
          height={300}
          className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110"
        />
      </figure>

      {/* Content */}
      <div className="card-body p-5">

        {/* Category */}
        <span className="badge bg-primary/10 text-primary w-fit">
          {course.category || "General"}
        </span>

        {/* Title */}
        <h2 className="text-lg font-bold mt-2 line-clamp-2">
          {course.title}
        </h2>

        {/* Instructor */}
        <p className="text-gray-500 text-sm">
          Instructor: {course.instructor || "Unknown"}
        </p>

        {/* Level */}
        <p className="text-xs text-gray-400">
          Level: {course.level || "All Levels"}
        </p>

        {/* Rating + Duration */}
        <div className="flex items-center justify-between mt-3">

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 font-medium">
            ⭐ {course.rating || "0.0"}
          </div>

          {/* Duration */}
          <span className="text-sm text-gray-400">
            {course.duration || "N/A"}
          </span>
        </div>

        {/* Button */}
        <div className="mt-4">
          <Link
            href={`/courses/${course.id}`}
            className="block w-full text-center py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;