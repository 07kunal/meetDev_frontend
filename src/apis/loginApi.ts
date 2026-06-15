import type { LoginBody, LoginResponse } from "@/components/utils/type/user";
import axios from "axios";

// API function
const loginApi = async (credentials: LoginBody): Promise<LoginResponse> => {
  try {
    const url: string = "http://localhost:3000/login";
    const response = await axios.post<LoginResponse>(url, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('testdsfsfd');
  }
};

export default loginApi;
