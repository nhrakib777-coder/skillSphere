import HeroSlider from "@/components/HeroSlider";
import CourseCard from "@/components/CourseCard";
import coursesData from "@/data/courses.json";
import Image from "next/image";

//  Stable avatar images (replaced pravatar.cc)
const instructors = [
  {
    id: 1,
    name: "John Doe",
    role: "Web Dev Expert",
    img: "https://images.unsplash.com/photo-1584999734482-0361aecad844?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGZhY2UlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "UI/UX Designer",
    img: "https://images.unsplash.com/photo-1727292778959-ed3628286b98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHByb2ZmZXNpb25hbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Marketing Expert",
    img: "https://images.unsplash.com/photo-1724654814389-0c9f67517cc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SVQlMjB0ZWFjaGVyfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Lisa Brown",
    role: "Graphic Designer",
    img: "https://images.unsplash.com/photo-1573496800808-56566a492b63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fElUJTIwdGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function Home() {
  const sortedCourses = [...coursesData].sort((a, b) => b.rating - a.rating);

  const popularCourses = sortedCourses.slice(0, 3);
  const trendingCourses = sortedCourses.slice(3, 6);

  return (
    <div>
      {/* 🎥 Hero */}
      <HeroSlider />

      {/* 🔥 Popular Courses */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Popular Courses</h2>
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

      {/* 🚀 Trending */}
      <section className="py-16 bg-primary/5 dark:bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
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

      {/* 👨‍🏫 Instructors */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Top Instructors</h2>
          <p className="text-gray-500 mt-2">
            Learn from industry professionals
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {instructors.map((ins) => (
            <div
              key={ins.id}
              className="text-center p-5 rounded-2xl backdrop-blur-lg bg-white/20 dark:bg-white/5 border border-white/20 shadow-lg hover:scale-105 transition"
            >
              <Image
                src={ins.img}
                alt={ins.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/30"
              />

              <h4 className="font-bold mt-4">{ins.name}</h4>
              <p className="text-gray-500 text-sm">{ins.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💡 Learning Tips */}
      <section className="py-16 bg-secondary/5 dark:bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Learning Tips
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Stay Consistent",
                desc: "Study daily with small sessions instead of long irregular ones.",
              },
              {
                title: "Practice Projects",
                desc: "Build real-world projects to master your skills faster.",
              },
              {
                title: "Time Management",
                desc: "Plan your study routine and follow it strictly.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl backdrop-blur-lg bg-white/20 dark:bg-white/5 border border-white/20 shadow-lg text-center hover:scale-105 transition"
              >
                <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}