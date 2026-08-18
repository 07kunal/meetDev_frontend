import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { UserSignUp } from "../utils/type/user";
import { useMemo } from "react";

interface ProfileUpdateFormProps {
  onSubmit: SubmitHandler<UserSignUp>;
  mode: string;
  isPending: boolean;
  errorMessage: string | null;
}

// Validation helper functions
const validateFirstName = (value: string): boolean => {
  if (!value) return false;
  return value.length >= 4 && /^[A-Za-z]+$/.test(value);
};

const validateLastName = (value: string): boolean => {
  if (!value) return false;
  return value.length >= 4 && /^[A-Za-z]+$/.test(value);
};

const validateEmail = (value: string): boolean => {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const validatePassword = (value: string): boolean => {
  if (!value) return false;
  return (
    value.length >= 8 &&
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/.test(value)
  );
};

const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
  return confirmPassword === password && confirmPassword.length > 0;
};

const SignUpForm = ({
  onSubmit,
  mode,
  isPending,
  errorMessage,
}: ProfileUpdateFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<UserSignUp>({
    mode: 'onChange' // Validate on every change for real-time feedback
  });

  const watchedFirstName = watch("data.firstName");
  const watchedLastName = watch("data.lastName");
  const watchedEmail = watch("data.emailId");
  const watchedPassword = watch("data.password");
  const watchedConfirmPassword = watch("data.confirmPassword");

  // Real-time validation states
  const validationStates = useMemo(() => ({
    firstName: validateFirstName(watchedFirstName || ""),
    lastName: validateLastName(watchedLastName || ""),
    email: validateEmail(watchedEmail || ""),
    password: validatePassword(watchedPassword || ""),
    confirmPassword: validateConfirmPassword(watchedPassword || "", watchedConfirmPassword || ""),
  }), [watchedFirstName, watchedLastName, watchedEmail, watchedPassword, watchedConfirmPassword]);

  const currentFormValues = getValues();
  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-8 bg-base-100 rounded-2xl shadow-lg border border-base-200 hover:shadow-xl transition-shadow duration-300"
      >
        {/* Form Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-base-content">Create Account</h2>
          <p className="text-sm text-base-content/60">Join us and start connecting</p>
        </div>

        {/* Error Message Alert */}
        {errorMessage && (
          <div className="alert alert-error shadow-md border-l-4 border-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2m2 2l2 2" />
            </svg>
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-5">
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <label className="label px-0">
                <span className="label-text font-semibold text-base-content">First Name</span>
              </label>
              <div className="relative">
                <input
                  id="firstName"
                  {...register("data.firstName", {
                    required: "First name is required",
                    minLength: { value: 4, message: "Min 4 characters" },
                    pattern: { value: /^[A-Za-z]+$/, message: "Letters only" },
                  })}
                  placeholder="Enter first name."
                  className={`input input-bordered w-full  transition-all duration-200 focus:ring-2 ${
                    watchedFirstName && validationStates.firstName
                      ? "border-success focus:ring-success focus:ring-offset-1"
                      : errors.data?.firstName
                        ? "input-error focus:ring-error focus:ring-offset-1"
                        : "focus:ring-primary focus:ring-offset-1"
                  }`}
                />
              </div>
              {errors.data?.firstName && (
                <p className="text-error text-xs font-medium flex items-center gap-1 mt-1">
                  <span>⚠</span> {errors.data?.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="label px-0">
                <span className="label-text font-semibold text-base-content">Last Name</span>
              </label>
              <div className="relative">
                <input
                  id="lastName"
                  {...register("data.lastName", {
                    required: "Last name is required",
                    minLength: { value: 4, message: "Min 4 characters" },
                    pattern: { value: /^[A-Za-z]+$/, message: "Letters only" },
                  })}
                  placeholder="Enter last name"
                  className={`input input-bordered w-full  transition-all duration-200 focus:ring-2 ${
                    watchedLastName && validationStates.lastName
                      ? "border-success focus:ring-success focus:ring-offset-1"
                      : errors.data?.lastName
                        ? "input-error focus:ring-error focus:ring-offset-1"
                        : "focus:ring-primary focus:ring-offset-1"
                  }`}
                />
              </div>
              {errors.data?.lastName && (
                <p className="text-error text-xs font-medium flex items-center gap-1 mt-1">
                  <span>⚠</span> {errors.data?.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="label px-0">
              <span className="label-text font-semibold text-base-content">Email</span>
            </label>
            <div className="relative">
              <input
                id="emailId"
                type="email"
                {...register("data.emailId", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="john@example.com"
                className={`input input-bordered w-full  transition-all duration-200 focus:ring-2 ${
                  watchedEmail && validationStates.email
                    ? "border-success focus:ring-success focus:ring-offset-1"
                    : errors.data?.emailId
                      ? "input-error focus:ring-error focus:ring-offset-1"
                      : "focus:ring-primary focus:ring-offset-1"
                }`}
              />
            </div>
            {errors.data?.emailId && (
              <p className="text-error text-xs font-medium flex items-center gap-1 mt-1">
                <span>⚠</span> {errors.data?.emailId.message}
              </p>
            )}
          </div>

          {/* Password Fields Section */}
          {mode !== "edit-profile" && (
            <div className="space-y-4 pt-2">
              <div className="divider my-0"></div>

              {/* Password */}
              <div className="space-y-2">
                <label className="label px-0">
                  <span className="label-text font-semibold text-base-content">Password</span>
                </label>
                <div className="relative">
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
                        message: "Must include uppercase, number & special character",
                      },
                    })}
                    placeholder="Enter password"
                    className={`input input-bordered w-full  transition-all duration-200 focus:ring-2 ${
                      watchedPassword && validationStates.password
                        ? "border-success focus:ring-success focus:ring-offset-1"
                        : errors.data?.password
                          ? "input-error focus:ring-error focus:ring-offset-1"
                          : "focus:ring-primary focus:ring-offset-1"
                    }`}
                  />
                </div>
                {errors.data?.password && (
                  <p className="text-error text-xs font-medium flex items-start gap-1 mt-1">
                    <span className="mt-0.5">⚠</span>
                    <span>{errors.data?.password.message}</span>
                  </p>
                )}
                <div className="mt-2 space-y-1">
                  <p className={`text-xs font-medium flex items-center gap-2 ${
                    watchedPassword && watchedPassword.length >= 8 ? "text-success" : "text-base-content/50"
                  }`}>
                    <span>{watchedPassword && watchedPassword.length >= 8 ? "✓" : "○"}</span> Min 8 characters
                  </p>
                  <p className={`text-xs font-medium flex items-center gap-2 ${
                    watchedPassword && /[A-Z]/.test(watchedPassword) ? "text-success" : "text-base-content/50"
                  }`}>
                    <span>{watchedPassword && /[A-Z]/.test(watchedPassword) ? "✓" : "○"}</span> Uppercase letter
                  </p>
                  <p className={`text-xs font-medium flex items-center gap-2 ${
                    watchedPassword && /\d/.test(watchedPassword) ? "text-success" : "text-base-content/50"
                  }`}>
                    <span>{watchedPassword && /\d/.test(watchedPassword) ? "✓" : "○"}</span> Number
                  </p>
                  <p className={`text-xs font-medium flex items-center gap-2 ${
                    watchedPassword && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(watchedPassword) ? "text-success" : "text-base-content/50"
                  }`}>
                    <span>{watchedPassword && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(watchedPassword) ? "✓" : "○"}</span> Special character
                  </p>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="label px-0">
                  <span className="label-text font-semibold text-base-content">Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register("data.confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === currentFormValues?.data?.password ||
                        "Passwords do not match",
                    })}
                    placeholder="Confirm password"
                    className={`input input-bordered w-full  transition-all duration-200 focus:ring-2 ${
                      watchedConfirmPassword && validationStates.confirmPassword
                        ? "border-success focus:ring-success focus:ring-offset-1"
                        : errors.data?.confirmPassword
                          ? "input-error focus:ring-error focus:ring-offset-1"
                          : "focus:ring-primary focus:ring-offset-1"
                    }`}
                  />
                </div>
                {errors.data?.confirmPassword && (
                  <p className="text-error text-xs font-medium flex items-center gap-1 mt-1">
                    <span>⚠</span> {errors.data?.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full mt-4 font-semibold text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="loading loading-spinner loading-xs"></span>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Terms & Conditions */}
        {/* <p className="text-center text-xs text-base-content/60">
          By signing up, you agree to our{" "}
          <a href="#" className="link link-primary font-semibold no-underline hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="link link-primary font-semibold no-underline hover:underline">
            Privacy Policy
          </a>
        </p> */}
      </form>
    </div>
  );
};

export default SignUpForm;
