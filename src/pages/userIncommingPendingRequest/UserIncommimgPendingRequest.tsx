import { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import AccordionPendingRequest from "@/components/AccordionPendingRequest/AccordionPendingRequest";
import { fetchMyIncommingPendingRequestApi } from "@/apis/userConnection/fetchMyIncommingPendingRequest";
import { reviewingPendingRequestApi } from "@/apis/userConnection/reviewingPendingRequestApi";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import { setUserPendingRequest } from "@/components/utils/slices/userPendingRequestSlice";
import toast from "react-hot-toast";
import type {
  userPendingRequest,
  reviewUserConnectionRequestType,
} from "@/components/utils/type/userConnection";
import type {
  connectionRequestProps,
  ErrorResponse,
} from "@/components/utils/type/commonType";
import { AxiosError } from "axios";

const UserIncommimgPendingRequest = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(1); // user‑selected limit
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { data, isError, error } = useQuery<userPendingRequest>({
    queryKey: ["usesPendingRequest", page, limit],
    queryFn: async (): Promise<userPendingRequest> => {
      const result = await fetchMyIncommingPendingRequestApi({ page, limit });
      return result;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUserPendingRequest(data));
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      const axiosError = error as any;
      if (axiosError?.response?.status === 401) {
        console.log("error");
      }
    }
  }, [error]);

  const { mutate } = useMutation<
    reviewUserConnectionRequestType,
    AxiosError<ErrorResponse>,
    connectionRequestProps
  >({
    mutationFn: reviewingPendingRequestApi,
    onSuccess: (data) => {
      toast(data?.message);
      queryClient.refetchQueries({ queryKey: ["usesPendingRequest"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setErrorMessage(
        error?.response?.data?.message ?? "An unexpected error occurred",
      );
      console.error("Message:", error.response?.data?.message);
    },
  });

  const handleReviewPendingRequest = ({
    status,
    connectionRequestId,
  }: connectionRequestProps) => {
    mutate({ status, connectionRequestId });
  };

  const totalRecords = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalRecords / limit);
  // Calculate start–end range
  const start = page * limit + 1;
  const end = Math.min((page + 1) * limit, totalRecords);

  return (
    <div className="flex justify-center items-center flex-col w-full">
      <h1 className="text-center text-2xl p-1 mb-2">My Pending Requests</h1>

      {(data?.data?.length ?? 0) === 0 || errorMessage ? (
        <>
          {errorMessage ? (
            <h1>Something went wrong</h1>
          ) : (
            <h1>No more pending request</h1>
          )}
        </>
      ) : (
        <>
          <div className="h-[80vh]">
            {data?.data?.map((connectionItem) => (
              <AccordionPendingRequest
                data={connectionItem}
                key={connectionItem?._id}
                openId={openId}
                setOpenId={setOpenId}
                handleReviewPendingRequest={handleReviewPendingRequest}
              />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="btn-group mt-4 flex justify-between w-2xl ">
            <button
              className="btn"
              disabled={page === 0}
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            >
              Back
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`btn ${page === idx ? "btn-active" : ""}`}
                onClick={() => setPage(idx)}
              >
                {idx + 1}
              </button>
            ))}

            <button
              className="btn"
              disabled={page >= totalPages - 1}
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
            >
              Next
            </button>

            {/* Results per page dropdown */}
            <div className=" flex justify-between">
              <label className="mr-2 flex items-center">item:</label>
              <select
                className="select select-bordered"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(0); // reset to first page
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            {/* Summary */}
            <p className=" text-sm text-gray-600 flex items-center">
              {start}–{end} of {totalRecords} Results
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserIncommimgPendingRequest;
