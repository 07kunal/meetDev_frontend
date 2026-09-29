import type { userFeedData } from "@/utils/type/usersFeeds";
import axios from "axios";
import type { params } from "@/utils/type/commonType";
export const userFeedsApi = async (
  paramsArgument: params,
): Promise<userFeedData> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/feed`;
    const response = await axios.get<userFeedData>(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,

      params: {
        limit: paramsArgument.limit, 
      },
    });
    console.log('Checking the feeds',response);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
