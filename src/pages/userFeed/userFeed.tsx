import { userFeedsApi } from "@/apis/userFeedsApi";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import { setUserFeeds } from "@/components/utils/slices/userFeedSliceReducer";
import type { Collection, userFeeds } from "@/components/utils/type/usersFeeds";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { params } from "@/components/utils/type/commonType";
import UserCard from "@/components/UserCard/UserCard";
import { clearUser } from "@/components/utils/slices/userSliceReducer";
import { useNavigate } from "react-router-dom";
const UserFeed = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryOptions: params = {
    page: 0,
    limit: 10,
  };

  const { data, isError, error } = useQuery<Collection<userFeeds>>({
    queryKey: ["userFeeds"],
    queryFn: async (): Promise<Collection<userFeeds>> => {
      const result = await userFeedsApi(queryOptions);
      return result;
    },
    retry: false, // Disable retry on error
  });
  useEffect(() => {
    if (data) {
      dispatch(setUserFeeds(data));
    }
  }, [data, isError, dispatch]);
  useEffect(() => {
    if (isError) {
      const axiosError = error as any;
      if (axiosError?.response?.status === 401) {
        dispatch(clearUser());
        navigate("/login");
      }
    }
  }, [isError, error, dispatch, navigate]);
  return <>{data && <UserCard data={data} />}</>;
};

export default UserFeed;
