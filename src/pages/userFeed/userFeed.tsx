import { userFeedsApi } from "@/apis/userFeedsApi";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import {
  setUserFeeds,
  removeUserFromFeed,
} from "@/components/utils/slices/userFeedSliceReducer";
import type { userFeedData } from "@/components/utils/type/usersFeeds";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard/UserCard";
import { clearUser } from "@/components/utils/slices/userSliceReducer";
import { useNavigate } from "react-router-dom";
import type { connectionRequestProps } from "@/components/utils/type/commonType";
import { sendingConnectionRequestApi } from "@/apis/userConnection/sendingConnectionRequestApi";
import type { reviewUserConnectionRequestType } from "@/components/utils/type/userConnection";
import type { ErrorResponse } from "@/components/utils/type/commonType";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const UserFeed = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [connectionId, setConnectionId] = useState<string>("");

  const { data, isError, error } = useQuery<userFeedData>({
    queryKey: ["userFeeds"],
    queryFn: async (): Promise<userFeedData> => {
      const result = await userFeedsApi();
      return result;
    },
    // enabled: shouldFetchProfile,
    retry: false, // Disable retry on error
  });
  useEffect(() => {
    if (data) {
      dispatch(setUserFeeds(data));
    }
  }, [data, isError, dispatch]);
  // Need to check why I've added this code here
  useEffect(() => {
    if (isError) {
      const axiosError = error as any;
      if (axiosError?.response?.status === 401) {
        dispatch(clearUser());
        navigate("/login");
      }
    }
  }, [isError, error, dispatch, navigate]);
  // added the API method for API call,
  const { mutate } = useMutation<
    reviewUserConnectionRequestType,
    AxiosError<ErrorResponse>,
    connectionRequestProps
  >({
    mutationFn: sendingConnectionRequestApi,

    onSuccess: (data) => {
      if (data?.status === "interested") {
        // navigate("/feeds");
        toast(data?.message);
      } else {
        toast(data?.message);
      }
      if (connectionId) {
        dispatch(removeUserFromFeed(connectionId));
      }
      //  queryClient.refetchQueries({ queryKey: ["usesPendingRequest"] });
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
  const handleConnectionRequest = ({
    status,
    connectionRequestId,
  }: connectionRequestProps) => {
    console.log("TEST", status, connectionRequestId);
    if (connectionRequestId) setConnectionId(connectionRequestId);
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
        <UserCard
          data={data?.data}
          action="feeds"
          handleConnectionRequest={handleConnectionRequest}
        />
      )}
    </div>
  );
};

export default UserFeed;
