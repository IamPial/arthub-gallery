import { Skeleton } from "@heroui/react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-6 w-full p-4 min-h-screen">
      <div className="w-full max-w-7xl mx-auto">
        <Skeleton className="h-14 w-full rounded-2xl bg-[#131129]/60" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl mx-auto">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-[#1a163a]/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-3"
          >
            <Skeleton className="w-full aspect-square rounded-xl bg-[#131129]/60 before:bg-[#6f4ff2]/10" />

            <div className="flex flex-col gap-2 mt-1">
              <Skeleton className="h-4 w-3/4 rounded-lg bg-[#131129]/60" />
              <Skeleton className="h-3 w-1/2 rounded-lg bg-[#131129]/60" />
              <div className="w-full h-px bg-white/5 my-1" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-1/4 rounded-md bg-[#131129]/60" />
                <Skeleton className="h-4 w-1/4 rounded-md bg-[#131129]/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Loading;
