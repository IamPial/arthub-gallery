import Image from "next/image";
import Link from "next/link";
import { Button, Card, Separator } from "@heroui/react";
import {
  FiCalendar,
  FiTag,
  FiDollarSign,
  FiUser,
  FiArrowLeft,
} from "react-icons/fi";
import DeleteArtworksModal from "@/components/dashboard/artist/DeleteArtworksModal";
import EditArtworksModal from "@/components/dashboard/artist/EditArtworksModal";
import { getArtworksDetails } from "@/lib/api/artworks";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "ArtHub- Browse Artworks Details",
  description:
    "ArtHub is a digital platform that connects art lovers, collectors, and buyers with talented artists.",
};

const ArtworkDetailsPage = async ({ params }) => {
  const { id } = await params;
  const art = await getArtworksDetails(id);

  const data = await getUserSession();
  const user = data?.user;
  const role = user?.role === "buyer";

  const isLoggedIn = !!user;
  const isOwner = isLoggedIn && user.id === art?.userId;
  const formattedDate = art.createdAt
    ? new Date(art.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-4 min-h-[calc(100vh-80px)]">
      <div className="flex justify-start mb-2">
        <Link
          href="/artworks"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium rounded-xl text-xs px-4 h-9 border border-white/5 backdrop-blur-md transition-all"
        >
          <FiArrowLeft size={16} />
          <Button className="bg-transparent rounded-none shadow-none">
            Back to Gallery
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 w-full">
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#131129] border border-white/5 shadow-2xl shadow-[#6f4ff2]/5">
            <Image
              src={art?.image}
              alt={art?.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute top-4 left-4 backdrop-blur-md bg-[#131129]/70 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold text-[#a78bfa] uppercase tracking-wider">
              <FiTag size={12} />
              {art?.category}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col gap-5 justify-start">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide leading-tight">
              {art?.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <FiUser className="text-[#6f4ff2]" size={14} />
              <span>by</span>
              <Link
                href={`/artist-profiles/${art?.userId}`}
                className="text-[#a78bfa] font-semibold hover:underline"
              >
                {art?.userName}
              </Link>
            </div>
          </div>

          {/* Artist Controls (Only for Owner) */}
          {isOwner && (
            <Card className="p-4 bg-[#6f4ff2]/5 border border-[#6f4ff2]/20 rounded-2xl flex flex-row items-center justify-between gap-3 shadow-lg">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide">
                  Edit or Delete this Artworks
                </span>
              </div>
              <div className="flex items-center gap-2">
                <EditArtworksModal artWork={art} />
                <DeleteArtworksModal artWork={art} />
              </div>
            </Card>
          )}

          {/* Price & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#1a163a]/40 border border-white/5 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                <FiDollarSign size={10} /> Price
              </span>
              <span className="text-xl font-black text-[#6f4ff2]">
                ${art?.price}
              </span>
            </div>
            <div className="p-4 bg-[#1a163a]/40 border border-white/5 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                <FiCalendar size={10} /> Minted On
              </span>
              <span className="text-sm font-bold text-slate-300 py-0.5">
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Description
            </span>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#131129]/20 p-4 rounded-2xl border border-white/[0.02] whitespace-pre-line">
              {art?.description}
            </p>
          </div>

          <Separator className="bg-white/5 my-1" />

          <div className="flex flex-col gap-3">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3 text-center p-4 bg-[#131129]/40 border border-white/5 rounded-2xl">
                <Link href="/signin" className="w-full">
                  <Button className="w-full bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-bold rounded-xl h-12">
                    Login to Purchase
                  </Button>
                </Link>
              </div>
            ) : isOwner ? (
              <Button
                isDisabled
                className="w-full bg-white/5 border border-white/10 text-slate-500 font-bold rounded-xl h-12"
              >
                You Own This Artworks
              </Button>
            ) : role ? (
              <form action="/api/payments" method="POST">
                <input type="hidden" name="price" value={art?.price} />
                <input type="hidden" name="title" value={art?.title} />
                <input type="hidden" name="productId" value={art?._id} />
                <input type="hidden" name="artistId" value={art?.userId} />
                <input type="hidden" name="artistName" value={art?.userName} />
                <input type="hidden" name="artWorksImg" value={art?.image} />
                <input type="hidden" name="category" value={art?.category} />
                <input
                  type="hidden"
                  name="description"
                  value={art?.description}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-bold rounded-xl h-12"
                >
                  Buy Now
                </Button>
              </form>
            ) : (
              <Button
                isDisabled
                className="w-full bg-white/5 border border-white/10 text-slate-500 font-bold rounded-xl h-12"
              >
                Artworks owner is {art.userName}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailsPage;
