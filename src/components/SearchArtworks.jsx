"use client";

import { Input, Select, ListBox } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

const SearchArtworks = () => {
  const inputClass =
    "bg-[#131129] border border-white/10 rounded-xl h-11 text-white placeholder:text-slate-500 text-sm data-[hover=true]:border-[#6f4ff2]/50 data-[focus=true]:border-[#6f4ff2]";

  return (
    <div className="w-full bg-[#1a163a]/40 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 max-w-7xl mx-auto backdrop-blur-md">
      {/* Top Row: Search & Sort */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <Input
            name="search"
            type="search"
            placeholder="Search artworks"
            startContent={
              <FiSearch className="text-slate-400 mr-1" size={16} />
            }
            className={inputClass}
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="md:col-span-2">
          <Select
            name="sortBy"
            placeholder="Sort By"
            className="flex flex-col"
            defaultValue="newest"
          >
            <Select.Trigger className="bg-[#131129] border border-white/10 rounded-xl h-11 px-4 text-sm text-white data-[hovered=true]:border-[#6f4ff2]/50 data-[focus-visible=true]:border-[#6f4ff2]">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-[#1a163a] border border-white/10 rounded-xl shadow-xl">
              <ListBox className="p-1">
                <ListBox.Item
                  id="newest"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  Newest Artworks
                </ListBox.Item>
                <ListBox.Item
                  id="price-low"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  Price: Low to High
                </ListBox.Item>
                <ListBox.Item
                  id="price-high"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  Price: High to Low
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {/* Bottom Row: Category & Price Range */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/5 pt-4">
        {/* Category Filter */}
        <div>
          <Select
            name="category"
            placeholder="All Categories"
            className="flex flex-col"
          >
            <Select.Trigger className="bg-[#131129] border border-white/10 rounded-xl h-11 px-4 text-sm text-white data-[hovered=true]:border-[#6f4ff2]/50 data-[focus-visible=true]:border-[#6f4ff2]">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-[#1a163a] border border-white/10 rounded-xl shadow-xl">
              <ListBox className="p-1">
                <ListBox.Item
                  id="all"
                  className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                >
                  All Categories
                </ListBox.Item>
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
            className={inputClass}
          />
        </div>

        {/* Max Price */}
        <div>
          <Input
            type="number"
            name="maxPrice"
            placeholder="Max Price ($)"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchArtworks;
