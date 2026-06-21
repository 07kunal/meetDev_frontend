import type { LoginResponse } from "@/components/utils/type/user";
import axios from "axios";

const fetchLoggedInUserProfile = async (): Promise<LoginResponse> => {
  try {
    let URL: string = `${import.meta.env.VITE_BASE_URL}/profile`;
    const response = await axios.get<LoginResponse>(URL, {
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

export default fetchLoggedInUserProfile;
