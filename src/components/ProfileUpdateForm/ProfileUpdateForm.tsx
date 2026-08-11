import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { UserProfile } from "../utils/type/user";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../utils/customHooks/reduxHook";
import { setUser } from "../utils/slices/userSliceReducer";
import { debounce } from "lodash";
import { defaultEducation } from "../utils/defaultData/defaultEducation";
import { defaultSkills } from "../utils/defaultData/defaultSkills";
import { XMarkIcon } from "@heroicons/react/24/solid";
interface ProfileUpdateFormProps {
  defaultValues?: Partial<UserProfile>;
  onSubmit: SubmitHandler<UserProfile>;
  errorMessage: string | null;
  isPending: boolean;
}

const ProfileUpdateForm = ({
  defaultValues = {},
  onSubmit,
  errorMessage,
  isPending,
}: ProfileUpdateFormProps) => {
  const dispatch = useAppDispatch();

  //  Clean the default values strictly for initial state injection
  const cleanDefaultValues = useMemo(() => {
    return JSON.parse(JSON.stringify(defaultValues));
  }, [defaultValues]);

  // Pass cloned values to initialization. RHF keeps track of changes locally.
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserProfile>({
    defaultValues: cleanDefaultValues,
  });
  const currentFormValues = getValues();

  // Stable debounced function to sync back to Redux
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

  //  Handle changes seamlessly without state overwrites
  const handleFormChange = () => {
    debouncedDispatch(currentFormValues);
  };

  const selectedSkills = watch("data.skills") || [];
  const selectedEducation = watch("data.education") || [];
  const removeEducation = (education: string) => {
    debouncedDispatch(currentFormValues);

    setValue(
      "data.education",
      selectedEducation.filter((s) => s !== education),
    );
  };
  const removeSkills = (skills: string) => {
    debouncedDispatch(currentFormValues);
    setValue(
      "data.skills",
      selectedSkills.filter((s) => s !== skills),
    );
  };
  const age = getValues("data.age");
  const genderValue = getValues("data.gender");

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
            maxLength: {
              value: 20,
              message: "Must be at most 20 characters",
            },
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

            maxLength: {
              value: 20,
              message: "Must be at most 20 characters",
            },
            pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" },
          })}
          placeholder="Last Name"
          className="input input-bordered w-full"
          disabled
        />
        {errors.data?.lastName && (
          <p className="text-error text-sm">{errors.data?.lastName.message}</p>
        )}
        {/* About */}
        <label className="label">
          <span className="label-text">About</span>
        </label>
        <input
          {...register("data.about", {
            required: "About is required",
            minLength: { value: 5, message: "Must be at least 5 characters" },
            maxLength: {
              value: 200,
              message: "Must be at most 200 characters",
            },
            pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" },
          })}
          placeholder="About"
          className="input input-bordered w-full"
        />
        {errors.data?.about && (
          <p className="text-error text-sm">{errors.data?.about.message}</p>
        )}
        {/* AGE */}
        <label className="label">
          <span className="label-text">Age</span>
        </label>
        <input
          {...register("data.age", {
            required: "Age is required",
            maxLength: {
              value: 3,
              message: "Does not exceed Three characters",
            },
            pattern: { value: /^[0-9]+$/, message: "Only number allowed" },
          })}
          placeholder="Age"
          className="input input-bordered w-full"
          disabled={age ? true : false}
        />
        {errors.data?.age && (
          <p className="text-error text-sm">{errors.data?.age?.message}</p>
        )}
        {/* Age end */}

        {/* Address*/}
        <label className="label">
          <span className="label-text">Address</span>
        </label>
        <input
          {...register("data.address", {
            required: "Address is required",
            minLength: {
              value: 5,
              message: "Must contain at least five characters",
            },
            maxLength: {
              value: 100,
              message: "Does not exceed Hundred characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9 ]+$/,
              message: "Only alpha numeric character allowed",
            },
          })}
          placeholder="Address"
          className="input input-bordered w-full"
        />
        {errors.data?.address && (
          <p className="text-error text-sm">{errors.data?.address?.message}</p>
        )}
        {/* Address end */}

        {/* Education  */}
        <label className="label">
          <span className="label-text">Education (select multiple)</span>
        </label>
        <select
          {...register("data.education", {
            required: "Please select the Education",
          })}
          multiple
          className="select select-bordered w-full h-32"
        >
          {defaultEducation?.map((item, index) => (
            <option key={index} value={item.degree}>
              {item.degree}
            </option>
          ))}
        </select>
        {errors.data?.education && (
          <p className="text-error text-sm">
            {errors.data?.education?.message}
          </p>
        )}

        {/* Chips for selected education*/}
        <div className="flex flex-wrap gap-2  max-h-15 overflow-y-auto">
          {selectedEducation.map((education: string) => (
            <span
              key={education}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 badge badge-primary"
            >
              {education}
              <button
                type="button"
                onClick={() => removeEducation(education)}
                className="ml-2 text-indigo-500 hover:text-indigo-700"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
        {/* Education end */}

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
          {defaultSkills?.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.data?.skills && (
          <p className="text-error text-sm">{errors.data?.skills.message}</p>
        )}

        {/* Chips for selected skills */}
        <div className="flex flex-wrap gap-2  max-h-15 overflow-y-auto">
          {selectedSkills.map((skill: string) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 badge badge-primary"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkills(skill)}
                className="ml-2 text-indigo-500 hover:text-indigo-700"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
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
          disabled={!!genderValue}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.data?.gender && (
          <p className="text-error text-sm">{errors.data?.gender.message}</p>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-secondary w-full mt-4">
          {isPending ? "Loading..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
