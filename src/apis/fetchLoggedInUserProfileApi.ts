import type { UserProfile } from "@/components/utils/type/user";
import axios from "axios";

const fetchLoggedInUserProfileApi = async (): Promise<UserProfile> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/profile`;
    const response = await axios.get<UserProfile>(URL, {
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

export default fetchLoggedInUserProfileApi;
