import Image from "next/image";
import Link from "next/link";
import { Button, Separator } from "@heroui/react";
import { FiCalendar, FiDollarSign, FiUser, FiArrowLeft } from "react-icons/fi";

import { format } from "date-fns";
import { getTransactionsDetails } from "@/lib/api/transactions";

const ArtworksBuyingDetailsPage = async ({ params }) => {
  const { id } = await params;
  const art = await getTransactionsDetails(id);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-4 min-h-[calc(100vh-80px)]">
      <div className="flex justify-start mb-2">
        <Link
          href="/dashboard/buyer"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium rounded-xl text-xs px-4 h-9 border border-white/5 backdrop-blur-md transition-all"
        >
          <FiArrowLeft size={16} />
          <Button className="bg-transparent rounded-none shadow-none">
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 w-full">
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#131129] border border-white/5 shadow-2xl shadow-[#6f4ff2]/5">
            <Image
              src={art?.artWorksImg}
              alt={art?.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col gap-5 justify-start">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide leading-tight">
              {art.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <FiUser className="text-[#6f4ff2]" size={14} />
              <span>by</span>
              <Link
                href={`/artist-profiles/${art?.artistId}`}
                className="text-[#a78bfa] font-semibold hover:underline"
              >
                {art?.artistName}
              </Link>
            </div>
          </div>

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
                {format(new Date(art?.purchaseDate), "MMM dd , yyyy")}
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
        </div>
      </div>
    </div>
  );
};
export default ArtworksBuyingDetailsPage;
