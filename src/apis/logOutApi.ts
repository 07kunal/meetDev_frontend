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
      return response.data;
    }
    throw new Error('something went wrong');
  } catch (error) {
    throw error;
  }
};
