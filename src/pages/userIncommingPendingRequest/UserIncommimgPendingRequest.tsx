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
import Pagination from "@/components/Pagination/Pagination";

const UserIncommimgPendingRequest = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10); // user‑selected limit
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


  return (
    <div className="flex justify-center items-center flex-col w-full">
      <h1 className="text-center text-2xl p-1 mb-3">My Pending Requests</h1>

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
          <div className="h-[70vh] overflow-y-auto">
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
          <Pagination 
           page={page}
           setPage={setPage}
           limit={limit}
           setLimit={setLimit}
           data={data}
          />
        
        </>
      )}
    </div>
  );
};

export default UserIncommimgPendingRequest;
