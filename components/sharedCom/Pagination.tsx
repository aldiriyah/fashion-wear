import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  total: number;
}

export default function Pagination({
  page,
  setPage,
  limit,
  total,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const goToPrev = () => page > 1 && setPage(page - 1);
  const goToNext = () => page < totalPages && setPage(page + 1);

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-3 px-4 py-2  shadow-md rounded-full border">
        <button
          onClick={goToPrev}
          disabled={page === 1}
          className={`p-2 rounded-full transition-all duration-200 
            ${
              page === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95"
            }`}
        >
          Previous
        </button>

        <div className="flex items-center gap-2 font-medium">
          <span className="px-3 py-1 rounded-full bg-indigo-600 text-white">
            {page}
          </span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-700 dark:text-gray-300">{totalPages}</span>
        </div>

        <button
          onClick={goToNext}
          disabled={page === totalPages}
          className={`p-2 rounded-full transition-all duration-200 
            ${
              page === totalPages
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
