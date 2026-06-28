"use client";

import { motion } from "framer-motion";
import ArtworkCard from "@/components/ArtworkCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const FeaturedAnimation = ({ artworks }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full"
    >
      {artworks.map((artwork) => (
        <motion.div
          key={artwork._id}
          variants={cardVariants}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <ArtworkCard artwork={artwork} />
        </motion.div>
      ))}
    </motion.div>
  );
};
export default FeaturedAnimation;
