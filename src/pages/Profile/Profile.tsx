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
    watch,
    formState: { errors },
  } = useForm<UserProfile>();
  const dispatch = useAppDispatch();
  const userData: UserProfile = useAppSelector((state) => state?.user);
  // Watch skills field to display chips
  const selectedSkills: string[] = watch("data.skills", []);

  const onSubmit: SubmitHandler<UserProfile> = (data: UserProfile) => {
    dispatch(setUser(data?.data)); // update store
  };
  useEffect(() => {
    reset(userData);
  }, [reset, userData]);
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      {/* Parent div */}
      <div className="flex items-center justify-center gap-4 bg-base-100 p-6 rounded-lg shadow-md">
        {/* Child div 1 */}
        <div className="text-primary-content rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-6 bg-base-200 rounded-lg shadow-md w-96"
          >
            {/* First Name */}
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              {...register("data.firstName", {
                required: "First name is required",
                minLength: {
                  value: 4,
                  message: "Must be at least 4 characters",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only letters allowed, no special characters",
                },
              })}
              placeholder="First Name"
              className="input input-bordered w-full"
            />
            {errors.data?.firstName && (
              <p className="text-error text-sm">
                {errors.data?.firstName.message}
              </p>
            )}

            {/* Last Name */}
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              {...register("data.lastName", {
                required: "Last name is required",
                minLength: {
                  value: 4,
                  message: "Must be at least 4 characters",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only letters allowed, no special characters",
                },
              })}
              placeholder="Last Name"
              className="input input-bordered w-full"
            />
            {errors.data?.lastName && (
              <p className="text-error text-sm">
                {errors.data?.lastName.message}
              </p>
            )}

            {/* Skills Multiple Select */}
            <label className="label">
              <span className="label-text">Skills (select multiple)</span>
            </label>
            <select
              {...register("data.skills", {
                required: "Please select at least one skill",
              })}
              multiple
              className="select select-bordered w-full h-32"
            >
              <option value="React">React</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Tailwind">Tailwind</option>
              <option value="DaisyUI">DaisyUI</option>
              <option value="Node.js">Node.js</option>
              <option value="Java">Java</option>
            </select>
            {errors.data?.skills && (
              <p className="text-error text-sm">
                {errors.data?.skills.message}
              </p>
            )}
            {/* Chips for selected skills */}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSkills &&
                selectedSkills.map((skill: string) => (
                  <span key={skill} className="badge badge-primary">
                    {skill}
                  </span>
                ))}
            </div>
            {/* Profile Pic */}
            <label className="label">
              <span className="label-text">Profile Picture URL</span>
            </label>
            <input
              {...register("data.profilePic", {
                required: "Profile picture URL is required",
              })}
              placeholder="Profile Pic URL"
              className="input input-bordered w-full"
            />
            {errors.data?.profilePic && (
              <p className="text-error text-sm">
                {errors.data?.profilePic.message}
              </p>
            )}

            {/* Gender Dropdown */}
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              {...register("data.gender", { required: "Please select gender" })}
              className="select select-bordered w-full"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.data?.gender && (
              <p className="text-error text-sm">
                {errors.data?.gender.message}
              </p>
            )}

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
