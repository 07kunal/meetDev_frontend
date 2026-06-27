import type { userFeeds, Collection } from "@/components/utils/type/usersFeeds";
import axios from "axios";

export const userFeedsApi = async (): Promise<Collection<userFeeds>> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/profile`;
    const response = await axios.get<Collection<userFeeds>>(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("resonse", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
