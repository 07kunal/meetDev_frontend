import { userFeedsApi } from "@/apis/userFeedsApi";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import { setUserFeeds } from "@/components/utils/slices/userFeedSliceReducer";
import type { Collection, userFeeds } from "@/components/utils/type/usersFeeds";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { params } from "@/components/utils/type/commonType";
import UserCard from "@/components/UserCard/userCard";

const UserFeed = () => {
  const dispatch = useAppDispatch();
  const queryOptions: params = {
    page: 0,
    limit: 10,
  };

  const { data } = useQuery<Collection<userFeeds>>({
    queryKey: ["userFeeds"],
    queryFn: async (): Promise<Collection<userFeeds>> => {
      const result = await userFeedsApi(queryOptions);
      return result;
    },
  });
  useEffect(() => {
    if (data) {
      dispatch(setUserFeeds(data));
    }
  }, [data]);
  console.log("data", data);
  return (
    <>
      <UserCard />
    </>
  );
};

export default UserFeed;
