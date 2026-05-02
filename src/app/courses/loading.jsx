import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Title skeleton */}
      <div className="w-48 h-8 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-10 animate-pulse"></div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}