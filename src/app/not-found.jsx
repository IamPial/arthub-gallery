import Link from "next/link";
import { Button } from "@heroui/react";
import { FiAlertOctagon } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#6f4ff2]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mb-6 text-[#6f4ff2] opacity-80 animate-bounce duration-1000">
        <FiAlertOctagon size={80} strokeWidth={1} />
        <span className="absolute inset-0 flex items-center justify-center font-black text-xl text-white mt-1">
          404
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-white tracking-wide mb-2">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-400 max-w-sm mb-8 leading-relaxed font-medium">
        The coordinates you have entered do not exist within the ArtHub secure
        mainframe network.
      </p>

      <Link href="/">
        <Button className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-bold text-sm rounded-xl px-6 h-12 shadow-lg shadow-[#6f4ff2]/20 transition-all">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
