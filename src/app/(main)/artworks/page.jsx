import ArtworkCard from "@/components/ArtworkCard";
import SearchArtworks from "@/components/SearchArtworks";
import { getAllArtworks } from "@/lib/api/artworks";
import { FiInbox } from "react-icons/fi";

const BrowseArtworksPage = async ({ searchParams }) => {
  const { search, minPrice, maxPrice, category } = await searchParams;
  const artworks = await getAllArtworks({
    search,
    minPrice,
    maxPrice,
    category,
  });

  return (
    <div className="flex flex-col gap-6 w-full p-4">
      <SearchArtworks />

      {artworks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-[#1a163a]/20 border border-dashed border-white/10 rounded-2xl max-w-7xl mx-auto w-full min-h-[400px] backdrop-blur-md">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#6f4ff2]/10 border border-[#6f4ff2]/20 text-[#a78bfa] mb-5 shadow-lg shadow-[#6f4ff2]/5">
            <FiInbox size={28} />
          </div>

          <h3 className="text-lg font-bold text-white tracking-wide">
            No Masterpieces Found
          </h3>

          <p className="text-sm text-slate-400 max-w-sm mt-2 font-medium leading-relaxed">
            {search ? (
              <>
                We couldn&apos;t find any artworks matching{" "}
                <span className="text-[#a78bfa] font-semibold">{search}</span>.
                Try adjusting your keywords or clearing the filters.
              </>
            ) : (
              "The showcase gallery is currently empty or no items match the selected filter matrix."
            )}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl mx-auto">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork._id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseArtworksPage;
