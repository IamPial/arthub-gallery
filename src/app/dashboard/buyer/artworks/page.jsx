import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

import { getTransactions } from "@/lib/api/transactions";

export const metadata = {
  title: "ArtHub- Browse Artworks",
  description:
    "ArtHub is a digital platform that connects art lovers, collectors, and buyers with talented artists.",
};



const BoughtArtworksPage = async () => {
  const buyingData = await getTransactions("buyer");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-wide">Bought Artworks</h1>
        <p className="text-sm text-slate-400">
          Your collection of premium Artworks
        </p>
      </div>

      {buyingData && buyingData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {buyingData.map((art) => (
            <Card
              key={art._id}
              className="bg-[#1a163a]/40 border border-white/5 rounded-2xl overflow-hidden group"
            >
              <div className="h-[240px] relative w-full overflow-hidden">
                <Image
                  src={art?.artWorksImg}
                  alt={art?.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5 flex flex-col gap-3 items-start bg-[#1a163a]/60 backdrop-blur-md border-t border-white/5">
                <div className="w-full">
                  <h3 className="font-bold text-lg text-white truncate">
                    {art?.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    By {art?.artistName}
                  </p>
                </div>

                <Link
                  href={`/dashboard/buyer/artworks/${art._id}`}
                  className="w-full bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl text-xs text-center transition-all shadow-md mt-1"
                >
                  <Button className="bg-transparent rounded-none w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 border border-dashed border-white/10 rounded-2xl bg-[#1a163a]/10 p-8 my-auto text-center">
          <div className="p-4 bg-[#6f4ff2]/10 rounded-full mb-4 text-[#6f4ff2]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            No Artworks Purchased Yet
          </h3>
          <p className="text-sm text-slate-400 max-w-sm mb-6">
            It looks like you haven&apos;t bought any artworks yet. Explore our
            gallery to find your next favorite artworks!
          </p>
          <Link href="/artworks">
            <Button className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white px-6 font-medium rounded-xl transition-all">
              Browse Gallery
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BoughtArtworksPage;
