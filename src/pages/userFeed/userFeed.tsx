import { userFeedsApi } from "@/apis/userFeedsApi";
import type { Collection, userFeeds } from "@/components/utils/type/usersFeeds";

import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const UserFeed = () => {
  const {data} = useQuery<Collection<userFeeds>,AxiosError>({
    queryKey: ['userFeeds'],
    queryFn: userFeedsApi
  });
  console.log('data',data);
  return (
    <div>userFeed</div>
  )
};

export default UserFeed;
