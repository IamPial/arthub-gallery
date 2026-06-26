"use client";

import { Card, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const ArtworkCard = ({ artwork }) => {
  return (
    <Card className="bg-[#1a163a]/40 border border-white/5 rounded-2xl overflow-hidden hover:border-[#6f4ff2]/40 transition-all duration-300 group shadow-lg">
      {/* Thumbnail Image Section */}
      <div className="relative aspect-square w-full bg-[#131129] overflow-hidden">
        <Image
          src={artwork?.image}
          alt={artwork?.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-1.5 bg-[#131129]/30">
        {/* Title */}
        <h3 className="text-white font-bold text-sm tracking-wide truncate group-hover:text-[#a78bfa] transition-colors">
          {artwork?.title}
        </h3>

        {/* Artist Name */}
        <p className="text-xs text-slate-400 font-medium truncate">
          by {artwork?.userName ? artwork.userName.split(" ")[0] : "Artist"}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 my-1" />

        <div className="flex items-center justify-between mt-1 gap-2">
          <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
            Price
          </span>
          <span className="text-[#6f4ff2] font-extrabold text-sm">
            ${artwork?.price}
          </span>
        </div>

        <Link href={`/artworks/${artwork?._id}`}>
          <Button
            size="sm"
            className=" w-full bg-[#6f4ff2]/10 border border-[#6f4ff2]/20 text-[#a78bfa] hover:bg-[#6f4ff2] hover:text-white font-semibold text-xs rounded-xl transition-all duration-300 h-9 px-3 mt-2 "
          >
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ArtworkCard;
