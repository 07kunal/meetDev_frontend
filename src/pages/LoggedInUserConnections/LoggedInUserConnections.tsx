import { fetchLoggedInUserConnectionApi } from "@/apis/userConnection/fetchLoggedInUserConnectionsApi";
import AccordionUserConnections from "@/components/AccordionUsersConnection/AccordionUserConnections";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import type { loggedInUserConnectionDataType } from "@/components/utils/type/userConnection";
import { useEffect, useState } from "react";
import type { params } from "@/components/utils/type/commonType";
import { useMutation, useQuery, useQueryClient,  keepPreviousData, } from "@tanstack/react-query";
import { setUserConnections } from "@/components/utils/slices/loggedInUserConnectionSlice";
import type { connectionRequestProps } from "@/components/utils/type/commonType";
import type { ErrorResponse } from "@/components/utils/type/commonType";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { reviewUserConnectionRequestType } from "@/components/utils/type/userConnection";
import Pagination from "@/components/Pagination/Pagination";
import { useTokenExpiredMethod } from "@/components/utils/customHooks/useTokenExpiredMethod";
import { SkeletonLoader } from "@/components/common/SkeletonLoader";
import { sendRejectedConnectedUserApi } from "@/apis/userConnection/sendRejectedConnectedUserApi";


const LoggedInUserConnections = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const tokenExpiredMethod = useTokenExpiredMethod();
  const queryOptions: params = {
    page,
    limit,
  };
  const { data, isError, error,isLoading } = useQuery<loggedInUserConnectionDataType>({
    queryKey: ["usesConnections", page, limit],
    queryFn: async (): Promise<loggedInUserConnectionDataType> => {
      const result = await fetchLoggedInUserConnectionApi(queryOptions);
      return result;
    },
     retry: false,
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (data) {
      dispatch(setUserConnections(data));
      setErrorMessage(null);

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
  //   Handling the rejectionMethod
  const { mutate } = useMutation<
    reviewUserConnectionRequestType,
    AxiosError<ErrorResponse>,
    connectionRequestProps
  >({
    mutationFn: sendRejectedConnectedUserApi,

    onSuccess: (data) => {
      if (data?.status === "accepted") {
        // navigate("/feeds");
        toast(data?.message);
      } else {
        toast(data?.message);
      }
      setErrorMessage(null);
      queryClient.refetchQueries({ queryKey: ["usesConnections"] });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      if (!error.response?.data?.status) {
        setErrorMessage(
          error?.response?.data?.message ?? "An unexpected error occurred",
        );
      } else {
        setErrorMessage(null);
      }
    },
  });
  const handleReviewConnection = ({
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
            <h1 className="text-3xl font-semibold">My Connections</h1>
            <p className="mt-2 text-sm text-base-content/70">
              Review your current accepted connections and manage them from this list.
            </p>
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-error/20 bg-error/10 p-4 text-sm text-error">
              {errorMessage}
            </div>
          ) : (data?.data?.length ?? 0) === 0 ? (
            <div className="rounded-2xl border border-base-300 bg-base-200 p-6 text-center text-base-content/70">
              No connections found.
            </div>
          ) : (
            <>
              {isLoading && <SkeletonLoader />}

              <div className="space-y-4 h-[70vh] overflow-y-auto pr-2">
                {data?.data?.map((connectionItem) => (
                  <AccordionUserConnections
                    data={connectionItem}
                    key={connectionItem?.requestId}
                    openId={openId}
                    setOpenId={setOpenId}
                    handleReviewConnection={handleReviewConnection}
                  />
                ))}
              </div>

              <div className="flex align-center justify-center rounded-3xl border border-base-300 bg-base-200 p-4 shadow-sm">
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                  data={data}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoggedInUserConnections;
