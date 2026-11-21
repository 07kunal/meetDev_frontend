import type { userFeedData } from "@/type/usersFeeds";
import axios from "axios";
import type { params } from "@/type/commonType";
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
      console.log('Exception in userFeeds',error);
    throw error;
  }
};
