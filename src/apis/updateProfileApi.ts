import axios from "axios";
import type { UserProfile, userEditProfile } from "@/components/utils/type/user";

const updateProfileApi = async (
  EditData: userEditProfile ,
): Promise<UserProfile> => {
  try {
    const url: string = `${import.meta.env.VITE_BASE_URL}/profile/edit`;
    const response = await axios.patch<UserProfile>(url, EditData, {
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

export default updateProfileApi;