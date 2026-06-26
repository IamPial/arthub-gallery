"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiGrid } from "react-icons/fi";

const categories = [
  {
    name: "Painting",
    slug: "painting",
    count: "120+ Items",
    bg: "from-blue-600/20 to-transparent",
  },
  {
    name: "Digital Art",
    slug: "digital",
    count: "450+ Items",
    bg: "from-purple-600/20 to-transparent",
  },
  {
    name: "Sculpture",
    slug: "sculpture",
    count: "80+ Items",
    bg: "from-pink-600/20 to-transparent",
  },
  {
    name: "Photography",
    slug: "photography",
    count: "210+ Items",
    bg: "from-emerald-600/20 to-transparent",
  },
];

export default function ArtCategoriesSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col gap-8 overflow-hidden">
      <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
        <div className="flex items-center gap-1.5 text-[#a78bfa] text-xs font-bold uppercase tracking-wider">
          <FiGrid />
          <span>Classified Artworks</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide">
          Art{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f4ff2] to-[#a78bfa]">
            Categories
          </span>
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
      >
        {categories.map((cat, index) => (
          <Link
            href={`/artworks?search=${cat.slug}`}
            key={cat.slug}
            className="block"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: index * 0.08 },
                },
              }}
              whileHover={{ y: -5, borderColor: "rgba(167, 139, 250, 0.4)" }}
              className={`p-6 bg-gradient-to-br ${cat.bg} bg-[#131129]/40 border border-white/5 rounded-2xl backdrop-blur-md flex flex-col gap-1 cursor-pointer transition-colors h-32 justify-end`}
            >
              <h3 className="text-lg font-black text-white tracking-wide group-hover:text-[#a78bfa]">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {cat.count}
              </p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
