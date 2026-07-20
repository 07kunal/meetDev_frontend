import axios from "axios";
import type {
  ResetPassword,
  resetPasswordResponse,
} from "@/components/utils/type/user";


const resetPasswordApi = async (
  resetPasswordData: ResetPassword,
): Promise<resetPasswordResponse> => {
  const { confirmPassword, ...requiredData } = resetPasswordData;
  try {
    const url : string = `${import.meta.env.VITE_BASE_URL}/resetPassword`;
    const response = await axios.post<resetPasswordResponse>(url,requiredData,{
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    return response?.data;
  } catch (error) {
    throw error
  }
};
export default resetPasswordApi;
