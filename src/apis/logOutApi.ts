import type { logOutResponse } from "@/components/utils/type/user";
import axios from "axios";

export const handleLogout = async (): Promise<logOutResponse> => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/logout`;
    const response = await axios.post<logOutResponse>(url,{}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      // remove the cookie once logout
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return response.data;
    }
    throw new Error('something went wrong');
  } catch (error) {
    throw error;
  }
};
