import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { UserProfile } from "@/components/utils/type/user";
import {
  useAppDispatch,
  useAppSelector,
} from "@/components/utils/customHooks/reduxHook";
import { setUser } from "@/components/utils/slices/userSliceReducer";
import { useEffect } from "react";
const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfile>();
  const dispatch = useAppDispatch();
  const userData: UserProfile = useAppSelector((state) => state?.user);

  const onSubmit: SubmitHandler<UserProfile> = (data: UserProfile) => {
    dispatch(setUser(data)); // update store
    console.log("Updated Redux Store:", data);
  };
  useEffect(() => {
    reset(userData);
  }, [reset]);
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      {/* Parent div */}
      <div className="flex items-center justify-center gap-4 bg-base-100 p-6 rounded-lg shadow-md">
        {/* Child div 1 */}
        <div className="p-4 bg-primary text-primary-content rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-6 bg-base-200 rounded-lg shadow-md w-96"
          >
            {/* First Name */}
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              {...register("data.firstName")}
              placeholder="First Name"
              className="input input-bordered w-full"
            />

            {/* Last Name */}
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              {...register("data.lastName")}
              placeholder="Last Name"
              className="input input-bordered w-full"
            />

            {/* Skills Dropdown */}
            <label className="label">
              <span className="label-text">Skills</span>
            </label>
            <select
              {...register("data.skills")}
              className="select select-bordered w-full"
            >
              <option value="React">React</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Tailwind">Tailwind</option>
              <option value="DaisyUI">DaisyUI</option>
              <option value="Node.js">Node.js</option>
            </select>

            {/* Profile Pic */}
            <label className="label">
              <span className="label-text">Profile Picture URL</span>
            </label>
            <input
              {...register("data.profilePic")}
              placeholder="Profile Pic URL"
              className="input input-bordered w-full"
            />

            {/* Gender Dropdown */}
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              {...register("data.gender")}
              className="select select-bordered w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Save
            </button>
          </form>
        </div>

        {/* Child div 2 */}
        <div className="p-4 bg-secondary text-secondary-content rounded-lg">
          Card UI
        </div>
      </div>
    </div>
  );
};

export default Profile;
