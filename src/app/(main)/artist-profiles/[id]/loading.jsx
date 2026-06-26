import { Skeleton } from "@heroui/react";

const loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-8 animate-pulse">
      {/* Banner & Profile Card Skeleton */}
      <Skeleton className="w-full h-48 md:h-64 rounded-3xl bg-[#131129]/60" />
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-end -mt-20 px-6">
        <Skeleton className="w-32 h-32 rounded-2xl bg-[#131129]/80 border-4 border-[#1a163a]" />
        <div className="flex flex-col gap-2 w-48">
          <Skeleton className="h-6 w-full rounded-lg bg-[#131129]/60" />
          <Skeleton className="h-4 w-2/3 rounded-lg bg-[#131129]/60" />
        </div>
      </div>
      {/* Gallery Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            className="w-full aspect-[4/5] rounded-2xl bg-[#131129]/60"
          />
        ))}
      </div>
    </div>
  );
};
export default loading;
