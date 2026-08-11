import type { Dispatch, SetStateAction } from "react";
import type { loggedInUserConnectionDataType, userPendingRequest } from "@/components/utils/type/userConnection";

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  data?: userPendingRequest | loggedInUserConnectionDataType;
}

const Pagination = ({
  page,
  setPage,
  limit,
  setLimit,
  data,
}: PaginationProps) => {
  const totalRecords = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalRecords / limit));
  
  const start = totalRecords > 0 ? page * limit + 1 : 0;
  const end = Math.min((page + 1) * limit, totalRecords);

  const createPageButtons = () => {
    const pages: Array<number | "ellipsis"> = [];
    const currentPage = page + 1;
    const leftBoundary = Math.max(2, currentPage - 1);
    const rightBoundary = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);

    if (leftBoundary > 2) {
      pages.push("ellipsis");
    }

    for (let pageNum = leftBoundary; pageNum <= rightBoundary; pageNum += 1) {
      pages.push(pageNum);
    }

    if (rightBoundary < totalPages - 1) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-4xl">
      <div className="btn-group flex-wrap justify-center gap-1">
        <button
          className="btn btn-sm mr-2"
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          Back
        </button>

        {createPageButtons().map((item, idx) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="btn btn-sm btn-disabled cursor-default"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              className={`btn btn-sm ${
                page === item - 1 ? "btn-secondary btn-active text-white" : "btn-ghost"
              }`}
              aria-current={page === item - 1 ? "page" : undefined}
              onClick={() => setPage(item - 1)}
            >
              {item}
            </button>
          ),
        )}

        <button
          className="btn btn-sm ml-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-sm text-gray-600">Shows</span>
        <select
          className="select select-bordered select-sm"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(0);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <p className="text-sm text-gray-600 whitespace-nowrap">
          {start}–{end} of {totalRecords}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
