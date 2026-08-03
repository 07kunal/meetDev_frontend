import type { userFeedData} from "@/components/utils/type/usersFeeds";
import axios from "axios";
import type { params } from "@/components/utils/type/commonType";
export const userFeedsApi = async (): Promise<userFeedData> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/feed`;
    const response = await axios.get<userFeedData>(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
