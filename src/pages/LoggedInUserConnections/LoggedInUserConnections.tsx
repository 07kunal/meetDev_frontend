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
    <div className="flex justify-center items-center flex-col w-full">
      <h1 className="text-center text-2xl p-1 mb-1">My connections</h1>

      {(data?.data?.length ?? 0) === 0 || errorMessage ? (
        <>
          {errorMessage ? (
            <h1>Something went wrong</h1>
          ) : (
            <h1>No Connections found</h1>
          )}
        </>
      ) : (
        <>
        {
          isLoading && 
          <SkeletonLoader/>
        }
          <div className="h-[70vh] overflow-y-auto ">
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

export default LoggedInUserConnections;
