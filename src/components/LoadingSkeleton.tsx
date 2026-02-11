import React from "react";

interface LoadingSkeletonProps {
  count?: number;
  height?: string;
}

const FlightCardSkeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`p-4 ${className}`}>
      <div className="bg-white rounded-[22px] shadow-lg p-6 space-y-4">
        {/* Header shimmer */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
        </div>

        {/* Content shimmer */}
        <div className="space-y-3">
          <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Footer shimmer */}
        <div className="h-4 bg-gray-200 rounded-full w-1/3 animate-pulse mt-4"></div>
      </div>
    </div>
  );
};

/**
 * Loading skeleton component for flight cards
 * Displays a shimmer animation while flights are being loaded
 */
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 3,
  height,
}) => {
  return (
    <div className="space-y-10">
      {Array.from({ length: count }).map((_, index) => (
        <FlightCardSkeleton key={`skeleton-${index}`} className={height} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
