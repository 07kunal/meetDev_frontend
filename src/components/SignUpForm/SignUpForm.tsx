import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { UserSignUp } from "../utils/type/user";

interface ProfileUpdateFormProps {
  onSubmit: SubmitHandler<UserSignUp>;
  mode: string;
  isPending: boolean;
  errorMessage: string | null;
}

const SignUpForm = ({
  onSubmit,
  mode,
  isPending,
  errorMessage,
}: ProfileUpdateFormProps) => {
  // 2. Pass cloned values to initialization. RHF keeps track of changes locally.
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserSignUp>();

  const currentFormValues = getValues();
  console.log("currentForm", currentFormValues);
  return (
    <div>
      {errorMessage && <p className="text-error text-sm">{errorMessage}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 bg-base-200 rounded-lg shadow-md w-96"
      >
        {/* First Name */}
        <label className="label">
          <span className="label-text">First Name</span>
        </label>
        <input
          id="firstName"
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
          id="lastName"
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
        {/* Email*/}
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          id="emailId"
          type="email"
          {...register("data.emailId", {
            required: "Email is required",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.data?.emailId && (
          <p className="text-error text-sm">{errors.data?.emailId.message}</p>
        )}

        {/* Password */}
        {mode !== "edit-profile" && (
          <>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              {...register("data.password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
                  message:
                    "Please ensure your password includes at least one lowercase letter (a-z), one uppercase letter (A-Z), one number (0-9), or one special character.",
                },
              })}
              placeholder="Password"
              className="input input-bordered w-full"
            />
            {errors.data?.password && (
              <p className="text-error text-sm">
                {errors.data?.password.message}
              </p>
            )}
          </>
        )}
        {/* confirm password*/}
        {mode !== "edit-profile" && (
          <>
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("data.confirmPassword", {
                required: "confirm Password is required",
                validate: (value) =>
                  value === currentFormValues?.data?.password ||
                  "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className="input input-bordered w-full"
            />
            {errors.data?.confirmPassword && (
              <p className="text-error text-sm">
                {errors.data?.confirmPassword.message}
              </p>
            )}
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
