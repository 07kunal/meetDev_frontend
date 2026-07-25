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
import { PencilIcon } from "@heroicons/react/24/solid";
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
        toast("Successfully Sign up");
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
    dispatch(setUser(data)); // update store
    mutate(data);
  };

  return (
    <div className="bg-inherit rounded-lg">
      <h1 className="text-center text-2xl p-1 relative">
        Profile <PencilIcon className="absolute top-2 h-5 w-5 right-100" />
      </h1>
      {/* Parent div */}
      <div className="flex items-center justify-center  bg-base-100 p-6  shadow-md">
        {/* Child div 1 */}
        <div className="text-primary-content rounded-lg">
          <ProfileUpdateForm
            defaultValues={userData}
            onSubmit={onSubmit}
            key={"edit-profile"}
            errorMessage={errorMessage}
            isPending={isPending}
          />
        </div>

        {/* Child div 2 */}
        <div className="p-4 text-secondary-content rounded-lg">
          <UserCard data={userData?.data} action="userCardView" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
