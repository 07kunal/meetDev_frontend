import axios from "axios";
import type { reviewUserPendingRequestType } from "@/components/utils/type/userConnection";
import type { pendingRequestProps } from "@/components/utils/type/commonType";

export const reviewingPendingRequestApi = async ({
  status,
  pendingRequestId,
}: pendingRequestProps): Promise<reviewUserPendingRequestType> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/request/review/${status}/${pendingRequestId}`;
    const response = await axios.post<reviewUserPendingRequestType>(
      URL,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
