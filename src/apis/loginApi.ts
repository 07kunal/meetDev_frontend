import type { LoginBody } from "@/pages/loginForm/LoginForm";
import type { LoginResponse } from "@/pages/loginForm/LoginForm";
import axios from "axios";

// API function
const loginApi = async (credentials: LoginBody): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "https://example.com",
    credentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export default loginApi;
