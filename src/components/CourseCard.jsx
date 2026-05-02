import Link from "next/link";
import Image from "next/image";

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <div className="card bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

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
      <div className="card-body p-5 text-gray-800 dark:text-gray-200">

        {/* Category */}
        <span className="bg-primary/20 text-primary w-fit py-1 px-2 text-xs rounded-full backdrop-blur-sm">
          {course.category || "General"}
        </span>

        {/* Title */}
        <h2 className="text-lg font-bold mt-2 line-clamp-2">
          {course.title}
        </h2>

        {/* Instructor */}
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Instructor: {course.instructor || "Unknown"}
        </p>

        {/* Level */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Level: {course.level || "All Levels"}
        </p>

        {/* Rating + Duration */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-yellow-400 font-medium">
            ⭐ {course.rating || "0.0"}
          </div>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {course.duration || "N/A"}
          </span>
        </div>

        {/* Button */}
        <div className="mt-4">
          <Link
            href={`/courses/${course.id}`}
            className="block w-full text-center py-2 rounded-full bg-primary/80 backdrop-blur-md text-white hover:bg-primary transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;