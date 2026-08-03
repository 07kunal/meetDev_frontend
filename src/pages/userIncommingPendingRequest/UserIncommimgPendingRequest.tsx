import AccordionPendingRequest from "@/components/AccordionPendingRequest/AccordionPendingRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { params } from "@/components/utils/type/commonType";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import type {
  reviewUserConnectionRequestType,
  userPendingRequest,
} from "@/components/utils/type/userConnection";
import { fetchMyIncommingPendingRequestApi } from "@/apis/userConnection/fetchMyIncommingPendingRequest";
import { setUserPendingRequest } from "@/components/utils/slices/userPendingRequestSlice";
import type { connectionRequestProps } from "@/components/utils/type/commonType";
import type { ErrorResponse } from "@/components/utils/type/commonType";
import { AxiosError } from "axios";
import { reviewingPendingRequestApi } from "@/apis/userConnection/reviewingPendingRequestApi";
import toast from "react-hot-toast";

const UserIncommimgPendingRequest = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const queryOptions: params = {
    page: 0,
    limit: 10,
  };
  const { data, isError, error } = useQuery<userPendingRequest>({
    queryKey: ["usesPendingRequest"],
    queryFn: async (): Promise<userPendingRequest> => {
      const result = await fetchMyIncommingPendingRequestApi(queryOptions);
      return result;
    },
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
      if (data?.status === "accepted") {
        // navigate("/feeds");
        toast(data?.message);
      } else {
        toast(data?.message);
      }
       queryClient.refetchQueries({ queryKey: ["usesPendingRequest"] });
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

  const handleReviewPendingRequest = ({
    status,
    connectionRequestId,
  }: connectionRequestProps) => {
    mutate({ status, connectionRequestId });
  };

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
        data?.data?.map((connectionItem) => (
          <AccordionPendingRequest
            data={connectionItem}
            key={connectionItem?._id}
            openId={openId}
            setOpenId={setOpenId}
            handleReviewPendingRequest={handleReviewPendingRequest}
          />
        ))
      )}
    </div>
  );
};

export default UserIncommimgPendingRequest;
