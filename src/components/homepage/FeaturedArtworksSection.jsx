import Link from "next/link";
import { Button } from "@heroui/react";
import { FiZap } from "react-icons/fi";
import { getAllArtworks } from "@/lib/api/artworks";

import FeaturedAnimation from "./FeaturedAnimation";

export const dynamic = "force-dynamic";
const FeaturedArtworksSection = async () => {
  const artworks = await getAllArtworks({ limit: 8 });

  //prevent error with null
  if (!artworks || artworks.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col gap-10 md:gap-14 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6 relative group">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#6f4ff2]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#a78bfa] text-xs font-bold uppercase tracking-widest">
            <FiZap />
            <span>Exhibition</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-wide">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f4ff2] to-[#a78bfa]">
              Artworks
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium max-w-md">
            Explore the latest artworks fresh from the creative mainframe.
          </p>
        </div>

        <Link href="/artworks" className="self-start sm:self-auto">
          <Button className="bg-[#6f4ff2]/10 border border-[#6f4ff2]/20 hover:bg-[#6f4ff2] text-[#a78bfa] hover:text-white font-bold text-sm rounded-xl px-5 h-11 transition-all duration-300">
            Explore Gallery
          </Button>
        </Link>
      </div>

      <FeaturedAnimation artworks={artworks} />
    </section>
  );
};

export default FeaturedArtworksSection;
