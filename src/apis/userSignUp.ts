import type { UserSignUp } from "@/components/utils/type/user";
import axios from "axios";

interface signUpResponse {
  data: string;
}
const userSignUp = async (signUpData: UserSignUp): Promise<signUpResponse> => {
  try {
    const url: string = `${import.meta.env.VITE_BASE_URL}/signup`;
    const response = await axios.post<signUpResponse>(url, signUpData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default userSignUp;
