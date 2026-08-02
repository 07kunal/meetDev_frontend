import { fetchLoggedInUserConnectionApi } from "@/apis/userConnection/fetchLoggedInUserConnectionsApi";
import AccordionUserConnections from "@/components/AccordionUsersConnection/AccordionUserConnections";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import type { loggedInUserConnectionDataType } from "@/components/utils/type/userConnection";
import { useEffect, useState } from "react";
import type { params } from "@/components/utils/type/commonType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setUserConnections } from "@/components/utils/slices/loggedInUserConnectionSlice";
import type { pendingRequestProps } from "@/components/utils/type/commonType";
import type { ErrorResponse } from "@/components/utils/type/commonType";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { reviewingPendingRequestApi } from "@/apis/userConnection/reviewingPendingRequestApi";
import type { reviewUserPendingRequestType } from "@/components/utils/type/userConnection";

const LoggedInUserConnections = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const queryOptions: params = {
    page: 0,
    limit: 10,
  };
  const { data, isError, error } = useQuery<loggedInUserConnectionDataType>({
    queryKey: ["usesConnections"],
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
    reviewUserPendingRequestType,
    AxiosError<ErrorResponse>,
    pendingRequestProps
  >({
    mutationFn: reviewingPendingRequestApi,

    onSuccess: (data) => {
      if (data?.status === "accepted") {
        // navigate("/feeds");
        toast(data?.message);
        console.log("data-status", data?.status);
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
    pendingRequestId,
  }: pendingRequestProps) => {
    console.log("status", status);
    console.log("pendingRequst", pendingRequestId);
    mutate({ status, pendingRequestId });
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
        data?.data?.map((connectionItem) => (
          <AccordionUserConnections
            data={connectionItem}
            key={connectionItem?.requestId}
            openId={openId}
            setOpenId={setOpenId}
            handleReviewConnection={handleReviewConnection}
          />
        ))
      )}
    </div>
  );
};

export default LoggedInUserConnections;
