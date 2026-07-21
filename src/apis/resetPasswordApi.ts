import axios from "axios";
import type {
  ResetPassword,
  resetPasswordResponse,
} from "@/components/utils/type/user";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import { clearUser } from "@/components/utils/slices/userSliceReducer";
import { clearUserFeeds } from "@/components/utils/slices/userFeedSliceReducer";
import { useQueryClient } from "@tanstack/react-query";

const resetPasswordApi = async (
  resetPasswordData: ResetPassword,
): Promise<resetPasswordResponse> => {
  console.log('Api99999');
  const { confirmPassword, ...requiredData } = resetPasswordData;
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  try {
    const url: string = `${import.meta.env.VITE_BASE_URL}/resetPassword`;
    const response = await axios.put<resetPasswordResponse>(
      url,
      resetPasswordData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return response?.data;
  } catch (error) {
    throw error;
  }
};
export default resetPasswordApi;
