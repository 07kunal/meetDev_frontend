import type { UserProfile } from "@/components/utils/type/user";
import {
  useAppDispatch,
  useAppSelector,
} from "@/components/utils/customHooks/reduxHook";
import { setUser } from "@/components/utils/slices/userSliceReducer";
import SignUpForm from "@/components/SignUpForm/SignUpForm";
import UserCard from "@/components/UserCard/UserCard";

const Profile = () => {
  const dispatch = useAppDispatch();
  const userData: UserProfile = useAppSelector((state) => state?.user);
  // Watch skills field to display chips

  const onSubmit = (data: UserProfile) => {
    dispatch(setUser(data)); // update store
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      {/* Parent div */}
      <div className="flex items-center justify-center gap-4 bg-base-100 p-6 rounded-lg shadow-md">
        {/* Child div 1 */}
        <div className="text-primary-content rounded-lg">
          <SignUpForm defaultValues={userData} onSubmit={onSubmit} />
        </div>

        {/* Child div 2 */}
        <div className="p-4 text-secondary-content rounded-lg">
          <span>Profile view</span>
          <UserCard data={userData?.data} action="userCardView" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
