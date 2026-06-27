import Image from "next/image";
import { Button, Separator } from "@heroui/react";
import { FiGrid, FiMail, FiMapPin, FiCalendar, FiGlobe } from "react-icons/fi";
import ArtworkCard from "@/components/ArtworkCard";
import { getArtistById } from "@/lib/api/artist";
import Link from "next/link";

const ArtistProfilePage = async ({ params }) => {
  const { id } = await params;
  const data = await getArtistById(id);
  const artist = data?.artist;
  const artworks = data?.artworks;

  if (!artist) {
    return (
      <div className="w-full max-w-md mx-auto my-20 p-8 text-center bg-[#1a163a]/20 border border-dashed border-white/10 rounded-2xl backdrop-blur-md">
        <h3 className="text-xl font-bold text-white mb-2">
          Artist Profile Not Found
        </h3>
        <p className="text-sm text-slate-400">
          The creative entity you are looking for does not exist in our network.
        </p>
      </div>
    );
  }

  const joinDate = artist.createdAt
    ? new Date(artist.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Join Date N/A";

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-6 md:gap-8 min-h-screen">
      <div className="relative w-full h-40 md:h-56 rounded-3xl bg-gradient-to-r from-[#6f4ff2]/30 via-[#1a163a] to-[#6f4ff2]/10 border border-white/5 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#6f4ff2_0%,transparent_50%)] opacity-40" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-end -mt-20 md:-mt-24 px-4 md:px-8 pb-4 z-10">
        {/* Avatar */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-[#131129] border-4 border-[#121026] shadow-xl shadow-[#6f4ff2]/10">
          <Image
            src={artist?.image || "hhh"}
            alt={artist?.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info Grid */}
        <div className="flex-1 text-center md:text-left flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                {artist?.name}
              </h1>
              <p className="text-xs font-semibold text-[#a78bfa] uppercase tracking-widest mt-0.5">
                Verified Artist
              </p>
            </div>
            {/* Contact Button */}
            <Link href={`mailto:${artist?.email}`}>
              <Button className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl text-sm px-5 h-11 shadow-lg shadow-[#6f4ff2]/10 mt-5">
                Contact Artist
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="text-[#6f4ff2]" /> Joined {joinDate}
            </span>
            <span className="flex items-center gap-1.5">
              <FiGlobe className="text-[#6f4ff2]" /> {artist.email}
            </span>
          </div>
        </div>
      </div>

      <Separator className="bg-white/5 my-2" />

      <div className="flex flex-col gap-6">
        {/* Section Title */}
        <div className="flex items-center gap-2 px-2">
          <FiGrid className="text-[#6f4ff2]" size={18} />
          <h2 className="text-lg font-bold text-white tracking-wide">
            Artworks of {artist?.name}
          </h2>
          <span className="text-xs bg-[#6f4ff2]/10 border border-[#6f4ff2]/20 text-[#a78bfa] font-bold px-2.5 py-0.5 rounded-full">
            {artworks?.length || 0}
          </span>
        </div>

        {/* Dynamic Gallery List */}
        {!artworks || artworks.length === 0 ? (
          <div className="w-full text-center py-16 bg-[#1a163a]/20 border border-dashed border-white/10 rounded-2xl backdrop-blur-md">
            <p className="text-slate-400 text-sm">
              This artist hasn&apos;t published any masterpieces yet.
            </p>
          </div>
        ) : (
          /* Responsive grid system (mobile=2, tablet=3, desktop=4) as per specs */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>
      <div className="flex w-full justify-center mt-8">
        <Link href="/artworks">
          <Button className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl text-sm px-6 h-11 shadow-lg shadow-[#6f4ff2]/10 flex items-center justify-center">
            Back to Artworks
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
