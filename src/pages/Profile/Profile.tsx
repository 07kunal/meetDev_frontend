import type { UserProfile } from "@/components/utils/type/user";
import {
  useAppDispatch,
  useAppSelector,
} from "@/components/utils/customHooks/reduxHook";
import { setUser } from "@/components/utils/slices/userSliceReducer";
import ProfileUpdateForm from "@/components/ProfileUpdateForm/ProfileUpdateForm";
import UserCard from "@/components/UserCard/UserCard";

const Profile = () => {
  const dispatch = useAppDispatch();
  const userData: UserProfile = useAppSelector((state) => state?.user);
  // Watch skills field to display chips

  const onSubmit = (data: UserProfile) => {
    dispatch(setUser(data)); // update store
  };

  return (
    <div className="bg-inherit rounded-lg">
      <h1 className="text-center text-2xl p-1">Profile edit</h1>
      {/* Parent div */}
      <div className="flex items-center justify-center  bg-base-100 p-6  shadow-md">

        {/* Child div 1 */}
        <div className="text-primary-content rounded-lg">
          <ProfileUpdateForm
            defaultValues={userData}
            onSubmit={onSubmit}
            key={"edit-profile"}
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
