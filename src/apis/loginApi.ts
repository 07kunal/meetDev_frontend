import type { LoginBody, UserProfile } from "@/type/user";
import axios from "axios";

// API function
const loginApi = async (credentials: LoginBody): Promise<UserProfile> => {
  try {
    const url: string = `${import.meta.env.VITE_BASE_URL}/login`;
    const response = await axios.post<UserProfile>(url, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log('Exception in login_API',error);
    throw error;
  }
};

export default loginApi;
