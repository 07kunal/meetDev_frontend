import axios from "axios";
import type { params } from "@/components/utils/type/commonType";
import type { loggedInUserConnectionDataType } from "@/components/utils/type/userConnection";
export const fetchLoggedInUserConnectionApi = async (
  paramsArgument: params,
): Promise<loggedInUserConnectionDataType> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/user/connections`;
    const response = await axios.get<loggedInUserConnectionDataType>(URL, {
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
