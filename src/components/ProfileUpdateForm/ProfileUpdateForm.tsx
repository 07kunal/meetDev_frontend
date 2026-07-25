import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { UserProfile } from "../utils/type/user";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../utils/customHooks/reduxHook";
import { setUser } from "../utils/slices/userSliceReducer";
import { debounce } from "lodash";

interface ProfileUpdateFormProps {
  defaultValues?: Partial<UserProfile>;
  onSubmit: SubmitHandler<UserProfile>;
  key: string;
  errorMessage: string | null;
  isPending:boolean
}

const ProfileUpdateForm = ({ defaultValues = {}, onSubmit, key ,errorMessage,isPending}: ProfileUpdateFormProps) => {
  const dispatch = useAppDispatch();

  // 1. Clean the default values strictly for initial state injection
  const cleanDefaultValues = useMemo(() => {
    return JSON.parse(JSON.stringify(defaultValues));
  }, [defaultValues]);

  // 2. Pass cloned values to initialization. RHF keeps track of changes locally.
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserProfile>({
    defaultValues: cleanDefaultValues,
  });

  // 3. Stable debounced function to sync back to Redux
  const debouncedDispatch = useMemo(
    () =>
      debounce((updatedValues: UserProfile) => {
        // Deep clone before sending to Redux to safely sever RHF references
        dispatch(setUser(JSON.parse(JSON.stringify(updatedValues))));
      }, 500),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch]);

  // 4. Handle changes seamlessly without state overwrites
  const handleFormChange = () => {
    const currentFormValues = getValues();
    debouncedDispatch(currentFormValues);
  };

  const selectedSkills = getValues("data.skills") || [];

  return (
    <div>
      {errorMessage && <p className="text-error text-sm">{errorMessage}</p>}

      <form
        onChange={handleFormChange}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-6 bg-base-200 rounded-lg shadow-md w-96"
      >
        {/* First Name */}
        <label className="label">
          <span className="label-text">First Name</span>
        </label>
        <input
          {...register("data.firstName", {
            required: "First name is required",
            minLength: { value: 4, message: "Must be at least 4 characters" },
            pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" },
          })}
          placeholder="First Name"
          className="input input-bordered w-full"
            disabled 
        />
        {errors.data?.firstName && (
          <p className="text-error text-sm">{errors.data?.firstName.message}</p>
        )}

        {/* Last Name */}
        <label className="label">
          <span className="label-text">Last Name</span>
        </label>
        <input
          {...register("data.lastName", {
            required: "Last name is required",
            minLength: { value: 4, message: "Must be at least 4 characters" },
            pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" },
          })}
          placeholder="Last Name"
          className="input input-bordered w-full"
          disabled 
        />
        {errors.data?.lastName && (
          <p className="text-error text-sm">{errors.data?.lastName.message}</p>
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
          <p className="text-error text-sm">{errors.data?.skills.message}</p>
        )}

        {/* Chips for selected skills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSkills.map((skill: string) => (
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
          <p className="text-error text-sm">{errors.data?.gender.message}</p>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
            {isPending ? "Loading..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
