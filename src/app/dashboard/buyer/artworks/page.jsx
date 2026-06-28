import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

import { getTransactions } from "@/lib/api/transactions";

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
                className="w-full bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl text-xs  text-center transition-all shadow-md mt-1"
              >
                <Button className="bg-transparent rounded-none ">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoughtArtworksPage;
