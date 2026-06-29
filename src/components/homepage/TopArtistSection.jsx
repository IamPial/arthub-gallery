"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiAward } from "react-icons/fi";

const rawArtists = [
  {
    _id: "artist_1",
    name: "Manik Rahman",
    sales: "142 Sales",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    _id: "artist_2",
    name: "Safa Islam",
    sales: "118 Sales",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    _id: "artist_3",
    name: "Zayan Ahmed",
    sales: "95 Sales",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

export default function TopArtistSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col gap-8 overflow-hidden">
      <div className="flex justify-between items-end border-b border-white/5 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[#a78bfa] text-xs font-bold uppercase tracking-wider">
            <FiAward className="animate-pulse text-[#6f4ff2]" size={14} />
            <span>ON Demand Artist</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide">
            Top{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f4ff2] to-[#a78bfa]">
              Artists
            </span>
          </h2>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full"
      >
        {rawArtists.map((artist) => (
          <motion.div
            key={artist._id}
            variants={itemVariants}
            whileHover={{
              y: -4,
              scale: 1.01,
              borderColor: "rgba(111, 79, 242, 0.3)",
            }}
            className="flex items-center gap-4 p-4 bg-[#131129]/40 border border-white/5 rounded-2xl backdrop-blur-md shadow-lg transition-colors duration-200"
          >
            {/* Avatar Profile */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#131129] border-2 border-[#6f4ff2]/30 shadow-md">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            {/* Artist Metadata */}
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-bold text-white truncate tracking-wide">
                {artist.name}
              </h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                {artist.sales}
              </p>
              <Link
                href="#"
                className="text-xs text-[#a78bfa] font-bold hover:underline mt-1.5 self-start transition-all"
              >
                View Portfolio →
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
