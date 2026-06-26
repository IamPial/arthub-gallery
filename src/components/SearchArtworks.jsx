"use client";

import { Input, Select, ListBox } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchArtworks = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/artworks?${params.toString()}`);
  };

  const inputClass =
    "bg-[#131129] border border-white/10 rounded-xl h-11 text-white placeholder:text-slate-500 text-sm data-[hover=true]:border-[#6f4ff2]/50 data-[focus=true]:border-[#6f4ff2]";

  return (
    <div className="w-full bg-[#1a163a]/40 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 max-w-7xl mx-auto backdrop-blur-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Input
            name="search"
            type="search"
            onChange={(e) => updateQuery("search", e.target.value)}
            placeholder="Search artworks"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <Select
            name="sortBy"
            className="flex flex-col"
            defaultValue="price-low"
          >
            <Select.Trigger className="bg-[#131129] border border-white/10 rounded-xl h-11 px-4 text-sm text-white data-[hovered=true]:border-[#6f4ff2]/50 data-[focus-visible=true]:border-[#6f4ff2]">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-[#1a163a] border border-white/10 rounded-xl shadow-xl">
              <ListBox className="p-1">
                <ListBox.Item
                  id="price-low"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  Low to High
                </ListBox.Item>
                <ListBox.Item
                  id="price-high"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  High to Low
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {/* Bottom Row: Category & Price Range */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/5 pt-4">
        <div>
          <Select
            name="category"
            defaultValue="painting"
            onSelectionChange={(val) => {
              updateQuery("category", [...val][0]);
            }}
            className="flex flex-col"
          >
            <Select.Trigger className="bg-[#131129] border border-white/10 rounded-xl h-11 px-4 text-sm text-white data-[hovered=true]:border-[#6f4ff2]/50 data-[focus-visible=true]:border-[#6f4ff2]">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-[#1a163a] border border-white/10 rounded-xl shadow-xl">
              <ListBox className="p-1">
                <ListBox.Item
                  id="painting"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  Painting
                </ListBox.Item>
                <ListBox.Item
                  id="digital"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  Digital
                </ListBox.Item>
                <ListBox.Item
                  id="sculpture"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  Sculpture
                </ListBox.Item>
                <ListBox.Item
                  id="abstract"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  Abstract
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Min Price */}
        <div>
          <Input
            type="number"
            name="minPrice"
            placeholder="Min Price ($)"
            onChange={(e) => updateQuery("minPrice", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Max Price */}
        <div>
          <Input
            type="number"
            name="maxPrice"
            placeholder="Max Price ($)"
            onChange={(e) => updateQuery("maxPrice", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchArtworks;
