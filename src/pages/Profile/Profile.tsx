import type {
  UserProfile,
  userEditProfile,
} from "@/components/utils/type/user";
import {
  useAppDispatch,
  useAppSelector,
} from "@/components/utils/customHooks/reduxHook";
import { setUser } from "@/components/utils/slices/userSliceReducer";
import ProfileUpdateForm from "@/components/ProfileUpdateForm/ProfileUpdateForm";
import UserCard from "@/components/UserCard/UserCard";
import type { ErrorResponse } from "@/components/utils/type/commonType";
import { useMutation } from "@tanstack/react-query";
import updateProfileApi from "@/apis/updateProfileApi";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const Profile = () => {
  const dispatch = useAppDispatch();
  const userData: UserProfile = useAppSelector((state) => state?.user);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Mutation
  const { mutate, isPending } = useMutation<
    UserProfile,
    AxiosError<ErrorResponse>,
    userEditProfile
  >({
    mutationFn: updateProfileApi,

    onSuccess: (data) => {
      if (data?.data) {
        dispatch(setUser(data));
        toast(data?.message || 'Successfully update the profile');
      }
    },

    onError: (error) => {
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(null);
      }
    },
  });

  const onSubmit = (data: UserProfile) => {
    const updatedUser = data?.data;
    const editPayload: userEditProfile = {};

    if (
      updatedUser?.age !== undefined 
    ) {
      editPayload.age = updatedUser.age ?? undefined;
    }
     if (
      updatedUser?.about !== undefined 
    ) {
      editPayload.about = updatedUser.about ?? undefined;
    }

    if (updatedUser?.address ) {
      editPayload.address = updatedUser.address;
    }

    if (
      updatedUser?.profilePic
    ) {
      editPayload.profilePic = updatedUser.profilePic;
    }

    if (
      updatedUser?.education 
    ) {
      editPayload.education = updatedUser.education;
    }

    if (
      updatedUser?.skills
    ) {
      editPayload.skills = updatedUser.skills;
    }
     if (
      updatedUser?.gender
    ) {
      editPayload.gender = updatedUser.gender;
    }

    if (Object.keys(editPayload).length > 0) {
      mutate(editPayload);
    } else {
      toast("No changes were made.");
    }
  };

  return (
    <div className="bg-inherit rounded-lg">
      <h1 className="text-center text-2xl p-1">Update your profile.</h1>
      {/* Parent div */}
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 bg-base-100 p-3 sm:p-6 shadow-md">
        {/* Child div 1 */}
        <div className="text-primary-content rounded-lg w-full lg:flex-1 min-w-0">
          <ProfileUpdateForm
            defaultValues={userData}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
            isPending={isPending}
          />
        </div>

        {/* Child div 2 */}
        <div className="p-0 sm:p-4 text-secondary-content rounded-lg w-full lg:flex-1 min-w-0 flex justify-center">
          <UserCard data={userData?.data} action="userCardView" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
