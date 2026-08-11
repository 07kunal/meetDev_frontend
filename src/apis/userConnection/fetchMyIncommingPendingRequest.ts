import axios from "axios";
import type { params } from "@/components/utils/type/commonType";
import type { userPendingRequest } from "@/components/utils/type/userConnection";
export const fetchMyIncommingPendingRequestApi = async (
  paramsArgument: params,
): Promise<userPendingRequest> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/user/pendingRequest`;
    const response = await axios.get<userPendingRequest>(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      params: {
        page: (paramsArgument.page +1), // Automatically builds: ?page=X
        limit: paramsArgument.limit, // Automatically builds: &limit=Y
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
