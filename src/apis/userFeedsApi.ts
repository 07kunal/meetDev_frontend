import type { userFeeds, Collection } from "@/components/utils/type/usersFeeds";
import axios from "axios";
import type { params } from "@/components/utils/type/commonType";
export const userFeedsApi = async (
  paramsArgument: params,
): Promise<Collection<userFeeds>> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/feed`;
    const response = await axios.get<Collection<userFeeds>>(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      params: {
        page: paramsArgument.page, // Automatically builds: ?page=X
        limit: paramsArgument.limit, // Automatically builds: &limit=Y
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
