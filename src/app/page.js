import HeroSlider from "@/components/HeroSlider";
import CourseCard from "@/components/CourseCard";
import coursesData from "@/data/courses.json";
import Image from "next/image";

// Fake Instructors Data
const instructors = [
  { id: 1, name: "John Doe", role: "Web Dev Expert", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Sarah Smith", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, name: "Mike Johnson", role: "Marketing Expert", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, name: "Lisa Brown", role: "Graphic Designer", img: "https://randomuser.me/api/portraits/women/4.jpg" },
];

export default function Home() {
  
  const sortedCourses = [...coursesData].sort((a, b) => b.rating - a.rating);

  const popularCourses = sortedCourses.slice(0, 3);
  const trendingCourses = sortedCourses.slice(3, 6);

  return (
    <div>
      <HeroSlider />

      {/* Popular Courses */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-dark">
            Popular Courses
          </h2>
          <p className="text-gray-500 mt-2">
            Top rated courses loved by students
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Trending Courses */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-dark">
              Trending New Releases
            </h2>
            <p className="text-gray-500 mt-2">
              Recently launched high demand courses
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Instructors */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-dark">
            Top Instructors
          </h2>
          <p className="text-gray-500 mt-2">
            Learn from industry professional mentors
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {instructors.map((ins) => (
            <div key={ins.id} className="text-center card-hover p-4 rounded-lg shadow-md">
              <Image
                src={ins.img}
                alt={ins.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20"
              />
              <h4 className="font-bold mt-3">{ins.name}</h4>
              <p className="text-gray-500 text-sm">{ins.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Tips Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-dark">
              Learning Tips
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg card-hover text-center">
              <h3 className="text-xl font-bold mb-3">Stay Consistent</h3>
              <p className="text-gray-600">
                Study daily for small sessions rather than long occasional sessions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg card-hover text-center">
              <h3 className="text-xl font-bold mb-3">Practice Project Based</h3>
              <p className="text-gray-600">
                Build real projects while learning to master skills faster.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg card-hover text-center">
              <h3 className="text-xl font-bold mb-3">Time Management</h3>
              <p className="text-gray-600">
                Make a routine and follow it strictly for best results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}