import type { UserSignUp } from "@/utils/type/user";
import axios from "axios";
import type { signUpResponse } from "@/utils/type/user";

const userSignUpApi = async (
  signUpData: UserSignUp,
): Promise<signUpResponse> => {
  const { confirmPassword, ...requiredData } = signUpData.data;
  try {
    const url: string = `${import.meta.env.VITE_BASE_URL}/signup`;
    const response = await axios.post<signUpResponse>(url, requiredData, {
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

export default userSignUpApi;
