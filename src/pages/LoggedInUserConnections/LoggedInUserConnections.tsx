import { fetchLoggedInUserConnectionApi } from "@/apis/userConnection/fetchLoggedInUserConnectionsApi";
import AccordionUserConnections from "@/components/AccordionUsersConnection/AccordionUserConnections";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import type { loggedInUserConnectionDataType } from "@/components/utils/type/userConnection";
import { useEffect, useState } from "react";
import type { params } from "@/components/utils/type/commonType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setUserConnections } from "@/components/utils/slices/loggedInUserConnectionSlice";
import type { connectionRequestProps } from "@/components/utils/type/commonType";
import type { ErrorResponse } from "@/components/utils/type/commonType";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { reviewingPendingRequestApi } from "@/apis/userConnection/reviewingPendingRequestApi";
import type { reviewUserConnectionRequestType } from "@/components/utils/type/userConnection";
import Pagination from "@/components/Pagination/Pagination";

const LoggedInUserConnections = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const queryOptions: params = {
    page,
    limit,
  };
  const { data, isError, error } = useQuery<loggedInUserConnectionDataType>({
    queryKey: ["usesConnections", page, limit],
    queryFn: async (): Promise<loggedInUserConnectionDataType> => {
      const result = await fetchLoggedInUserConnectionApi(queryOptions);
      return result;
    },
  });
  useEffect(() => {
    if (data) {
      dispatch(setUserConnections(data));
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
  //   Handling the rejectionMethod
  const { mutate } = useMutation<
    reviewUserConnectionRequestType,
    AxiosError<ErrorResponse>,
    connectionRequestProps
  >({
    mutationFn: reviewingPendingRequestApi,

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
      console.error("Message:", error.response?.data?.message);
    },
  });
  const handleReviewConnection = ({
    status,
    connectionRequestId,
  }: connectionRequestProps) => {

    mutate({ status, connectionRequestId });
  };
  console.log("data=========userconnections", data);
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
