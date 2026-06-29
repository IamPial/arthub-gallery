
import { getAllArtworks } from "@/lib/api/artworks";

import { FiGrid } from "react-icons/fi";
import CategoriesAnimation from "./CategoriesAnimation";

const ArtCategoriesSection = async () => {
  const categories = await getAllArtworks({});
  
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
      <CategoriesAnimation categories={categories} />
    </section>
  );
};

export default ArtCategoriesSection;
