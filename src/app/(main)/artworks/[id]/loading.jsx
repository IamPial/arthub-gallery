import { Separator, Skeleton } from "@heroui/react";

const loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 min-h-[calc(100vh-80px)]">
      {/* Left Column Image Skeleton */}
      <div className="md:col-span-7">
        <Skeleton className="w-full aspect-square rounded-3xl bg-[#131129]/60 before:bg-[#6f4ff2]/10" />
      </div>
      {/* Right Column Details Skeleton */}
      <div className="md:col-span-5 flex flex-col gap-5 justify-start">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-3/4 rounded-xl bg-[#131129]/60" />
          <Skeleton className="h-4 w-1/4 rounded-lg bg-[#131129]/60" />
        </div>
        <Skeleton className="h-16 w-full rounded-2xl bg-[#131129]/40" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 rounded-2xl bg-[#131129]/60" />
          <Skeleton className="h-20 rounded-2xl bg-[#131129]/60" />
        </div>
        <div className="flex flex-col gap-2.5 mt-2">
          <Skeleton className="h-4 w-1/3 rounded-lg bg-[#131129]/60" />
          <Skeleton className="h-24 w-full rounded-2xl bg-[#131129]/40" />
        </div>
        <Separator className="bg-white/5 my-1" />
        <Skeleton className="h-12 w-full rounded-xl bg-[#131129]/60" />
      </div>
    </div>
  );
};

export default loading;
