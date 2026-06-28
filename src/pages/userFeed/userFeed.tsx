import { userFeedsApi } from "@/apis/userFeedsApi";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import { setUserFeeds } from "@/components/utils/slices/userFeedSliceReducer";
import type { Collection, userFeeds } from "@/components/utils/type/usersFeeds";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { params } from "@/components/utils/type/commonType";
import UserCard from "@/components/UserCard/UserCard";
import getIsFetchApiCall from "@/components/common/getIsFetchApiCall";
const UserFeed = () => {
  const dispatch = useAppDispatch();
  const isFetchAPICall = getIsFetchApiCall();
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
    // enabled: isFetchAPICall,
  });
  useEffect(() => {
    if (data) {
      dispatch(setUserFeeds(data));
    }
  }, [data]);
  return <>
    {
      data && 
        <UserCard data={data} />
    }
  </>;
};

export default UserFeed;
