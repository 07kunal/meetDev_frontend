import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { UserProfile } from "../utils/type/user";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../utils/customHooks/reduxHook";
import { setUser } from "../utils/slices/userSliceReducer";
import { debounce } from "lodash";

interface ProfileUpdateFormProps {
  onSubmit: SubmitHandler<UserProfile>;
  key: string;
}

const SignUpForm = ({
  onSubmit,
  key,
}: ProfileUpdateFormProps) => {
  const dispatch = useAppDispatch();

  // 2. Pass cloned values to initialization. RHF keeps track of changes locally.
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserProfile>();


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

  return (
    <div>
      <form
        onChange={handleFormChange}
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
            minLength: { value: 4, message: "Must be at least 4 characters" },
            pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" },
          })}
          placeholder="First Name"
          className="input input-bordered w-full"
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
        />
        {errors.data?.lastName && (
          <p className="text-error text-sm">{errors.data?.lastName.message}</p>
        )}
        {/* User Name */}
        {key !== "edit-profile" && (
          <>
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              {...register("data.userName", {
                required: "User name is required",
                minLength: {
                  value: 4,
                  message: "Must be at least 4 characters",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only letters allowed",
                },
              })}
              placeholder="User Name"
              className="input input-bordered w-full"
            />
            {errors.data?.userName && (
              <p className="text-error text-sm">
                {errors.data?.userName.message}
              </p>
            )}
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
