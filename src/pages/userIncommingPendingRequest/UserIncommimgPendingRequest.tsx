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
import { useTokenExpiredMethod } from "@/components/utils/customHooks/useTokenExpiredMethod";


const UserIncommimgPendingRequest = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5); // user‑selected limit
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const tokenExpiredMethod = useTokenExpiredMethod();

  const { data, isError, error } = useQuery<userPendingRequest>({
    queryKey: ["usesPendingRequest", page, limit],
    queryFn: async (): Promise<userPendingRequest> => {
      const result = await fetchMyIncommingPendingRequestApi({ page, limit });
      return result;
    },
    retry: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUserPendingRequest(data));
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError?.response?.data?.status === 401) {
        tokenExpiredMethod();
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
    },
  });

  const handleReviewPendingRequest = ({
    status,
    connectionRequestId,
  }: connectionRequestProps) => {
    mutate({ status, connectionRequestId });
  };


  return (
    <div className="flex justify-center bg-base-200 px-4 py-8 min-h-screen">
      <div className="w-full max-w-6xl space-y-6">
        <div className="rounded-3xl bg-base-100 p-6 shadow-lg shadow-base-200/50">
          <div className="mb-3 text-center">
            <h1 className="text-3xl font-semibold">My Pending Requests</h1>
            <p className="mt-2 text-sm text-base-content/70">
              Review incoming connection requests and accept or reject them from your inbox.
            </p>
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-error/20 bg-error/10 p-4 text-sm text-error">
              {errorMessage}
            </div>
          ) : (data?.data?.length ?? 0) === 0 ? (
            <div className="rounded-2xl border border-base-300 bg-base-200 p-6 text-center text-base-content/70">
              No more pending requests.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-[70vh] overflow-y-auto pr-2">
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

              <div className=" flex align-center justify-center rounded-3xl border border-base-300 bg-base-200 p-4 shadow-sm">
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                  data={data}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserIncommimgPendingRequest;
