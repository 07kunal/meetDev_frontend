export const SkeletonLoader = () => {
  return (
    <div className="collapse collapse-arrow bg-base-200 border border-base-400 rounded-2xl mb-4 w-2xl collapse-open">
      {/* Title Skeleton */}
      <div className="collapse-title font-semibold cursor-pointer p-2.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <div className="skeleton w-full h-full rounded-full"></div>
          </div>
          <div className="skeleton h-4 w-32"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="collapse-content text-sm space-y-4">
        <div>
          <div className="skeleton h-5 w-20 mb-2"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>

        <div>
          <div className="skeleton h-5 w-20 mb-2"></div>
          <div className="space-y-1">
            <div className="skeleton h-4 w-24"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>
        </div>

        <div>
          <div className="skeleton h-5 w-24 mb-2"></div>
          <div className="space-y-1">
            <div className="skeleton h-4 w-32"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-end gap-2 pt-4">
          <div className="skeleton h-10 w-24"></div>
        </div>
      </div>
    </div>
  );
};
