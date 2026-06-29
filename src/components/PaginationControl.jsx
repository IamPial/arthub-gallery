"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

const PaginationControl = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`/artworks?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center w-full mt-6 mb-8">
      <Pagination
        size="sm"
        className="bg-[#131129]  p-1.5  backdrop-blur-md "
      >
        <Pagination.Content className="flex items-center justify-center w-full gap-1.5">
          {/* Previous Button Container */}
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={currentPage === 1}
              onPress={() => handleChange(Math.max(1, currentPage - 1))}
              className="bg-transparent data-[disabled=true]:opacity-40 text-slate-400 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1 border border-transparent hover:border-white/5"
            >
              <Pagination.PreviousIcon className="w-3.5 h-3.5" />
              Prev
            </Pagination.Previous>
          </Pagination.Item>

          {/* Page Numbers */}
          {pages.map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onPress={() => handleChange(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs font-semibold transition-all cursor-pointer
                  ${
                    p === currentPage
                      ? "bg-[#6f4ff2] text-white shadow-md shadow-[#6f4ff2]/30 scale-105"
                      : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          {/* Next Button Container */}
          <Pagination.Item>
            <Pagination.Next
              isDisabled={currentPage === totalPages}
              onPress={() =>
                handleChange(Math.min(totalPages, currentPage + 1))
              }
              className="bg-transparent data-[disabled=true]:opacity-40 text-slate-400 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1 border border-transparent hover:border-white/5"
            >
              Next
              <Pagination.NextIcon className="w-3.5 h-3.5" />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
};

export default PaginationControl;
