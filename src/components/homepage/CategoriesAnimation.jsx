"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CategoriesAnimation = ({ categories }) => {
  //create an object with category and value
  const categoriesCounts = categories.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + 1;
    return acc;
  }, {});

  //create an array from categoryCounts obj with key value pairs
  const myCategories = Object.entries(categoriesCounts);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
    >
      {myCategories.map(([cat, count]) => (
        <Link href={`/artworks`} key={cat} className="block">
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: {
                opacity: 1,
                scale: 1,
                transition: { delay: count * 0.08 },
              },
            }}
            whileHover={{ y: -5, borderColor: "rgba(167, 139, 250, 0.4)" }}
            className={`p-6 bg-gradient-to-br ${cat == "digital" ? "from-blue-600/20" : cat == "painting" ? "from-purple-600/20 to-transparent" : cat == "sculpture" ? "from-pink-600/20 to-transparent" : "from-emerald-600/20 to-transparent"}   to-transparent bg-[#131129]/40 border border-white/5 rounded-2xl backdrop-blur-md flex flex-col gap-1 cursor-pointer transition-colors h-32 justify-end`}
          >
            <h3 className="text-lg font-black text-white tracking-wide group-hover:text-[#a78bfa]">
              {cat.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {count} Items
            </p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default CategoriesAnimation;
