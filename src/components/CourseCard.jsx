import Link from "next/link";
import Image from "next/image";

const CourseCard = ({ course }) => {
  return (
    <div className="card bg-white shadow-lg rounded-xl overflow-hidden card-hover">
      <figure className="overflow-hidden">
        <Image
          src={course.image} 
          alt={course.title} 
          className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110" 
          width={500}
          height={300}
        />
      </figure>
      <div className="card-body p-5">
        <span className="badge bg-primary/10 text-primary">{course.category}</span>
        <h2 className="text-lg font-bold mt-2 line-clamp-2">{course.title}</h2>
        <p className="text-gray-500 text-sm">Instructor: {course.instructor}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-accent">
            ★ {course.rating}
          </div>
          <span className="text-sm text-gray-400">{course.duration}</span>
        </div>

        <div className="mt-4">
          <Link 
            href={`/courses/${course.id}`} 
            className="block w-full text-center py-2 rounded-lg bg-primary text-white btn-hover"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;