import { Skeleton } from "@heroui/react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <Skeleton className="h-8 w-56 rounded-lg bg-[#2b2549]" />

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.04] bg-[#161233]/80 backdrop-blur-md">
        {/* Header */}
        <div className="grid grid-cols-4 bg-[#110d2c] px-6 py-5">
          <Skeleton className="h-4 w-20 rounded-md bg-[#2a2544]" />
          <Skeleton className="h-4 w-16 rounded-md bg-[#2a2544]" />
          <Skeleton className="h-4 w-14 rounded-md bg-[#2a2544]" />
          <Skeleton className="h-4 w-24 rounded-md bg-[#2a2544]" />
        </div>


        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center border-t border-white/[0.03] bg-[#1d1932] px-6 py-5"
          >
            <Skeleton className="h-5 w-40 rounded-md bg-[#2b2549]" />

            <Skeleton className="h-5 w-32 rounded-md bg-[#2b2549]" />

            <Skeleton className="h-5 w-16 rounded-md bg-[#3b2b63]" />

            <Skeleton className="h-5 w-28 rounded-md bg-[#2b2549]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;