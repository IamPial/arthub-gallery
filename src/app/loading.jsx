import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-8 min-h-[80vh] justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-3 my-8">
        <Spinner size="lg" color="secondary" className="scale-125" />
        <span className="text-xs font-bold text-[#a78bfa] uppercase tracking-widest animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
};
export default Loading;
