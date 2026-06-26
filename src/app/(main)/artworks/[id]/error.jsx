"use client"

import { Button } from "@heroui/react";
import Link from "next/link";

const Error = () => {
  return (
    <div className="w-full max-w-md mx-auto my-20 p-8 text-center bg-[#1a163a]/20 border border-dashed border-white/10 rounded-2xl backdrop-blur-md">
      <h3 className="text-xl font-bold text-white mb-2">
         Artwork Not Found
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        The artworks you are trying to access doesn&apos;t exist.
      </p>
      <Link href="/artworks">
        <Button className="bg-[#6f4ff2] text-white rounded-xl">
          Back to Gallery
        </Button>
      </Link>
    </div>
  );
};
export default Error;
