import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      
      <div className="backdrop-blur-lg bg-white/70 dark:bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 text-center max-w-md w-full">
        
        {/* Emoji / Icon */}
        <div className="text-6xl mb-4">😢</div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          404
        </h1>

        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mt-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 mt-3">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          
          <Link
            href="/"
            className="flex-1 text-center py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
          >
            🏠 Go Home
          </Link>

          <Link
            href="/courses"
            className="flex-1 text-center py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            📚 Browse Courses
          </Link>

        </div>
      </div>
    </div>
  );
}