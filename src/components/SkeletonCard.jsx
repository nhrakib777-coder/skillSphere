const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-md">

      {/* Image Skeleton */}
      <div className="w-full h-52 bg-gray-300 dark:bg-gray-700"></div>

      {/* Content */}
      <div className="p-4 space-y-3">

        {/* Category */}
        <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Title */}
        <div className="w-full h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-2/3 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Instructor */}
        <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Rating + Duration */}
        <div className="flex justify-between mt-3">
          <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-12 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Button */}
        <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg mt-3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;