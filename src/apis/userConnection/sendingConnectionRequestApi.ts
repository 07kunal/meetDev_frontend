import axios from "axios";
import type { reviewUserConnectionRequestType} from "@/components/utils/type/userConnection";
import type { connectionRequestProps } from "@/components/utils/type/commonType";

export const sendingConnectionRequestApi = async ({
  status,
  connectionRequestId,
}: connectionRequestProps): Promise<reviewUserConnectionRequestType> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/request/send/${status}/${connectionRequestId}`;
    const response = await axios.post<reviewUserConnectionRequestType>(
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
