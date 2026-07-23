import { useForm } from "react-hook-form";
import type { ResetPassword } from "../utils/type/user";
import type { SubmitHandler } from "react-hook-form";

interface ResetUpdateFormProps {
  onSubmit: SubmitHandler<ResetPassword>;
  errorMessage: string | null;
  isPending:boolean
}
function PasswordResetForm({ onSubmit, errorMessage,isPending }: ResetUpdateFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ResetPassword>();
  const currentFormValues = getValues();
 
  return (
    <>
      {errorMessage && <p className="text-error text-sm">{errorMessage}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 bg-base-200 rounded-lg shadow-md w-96"
      >
      <h1 className="font-bold text-xl">New Password</h1>

        {/* Old password */}
        <label className="label">
          <span className="label-test">Old Password</span>
        </label>
        <input
          id="oldPassword"
          type="password"
          placeholder="Old Password"
          className="input input-bordered w-full"
          {...register("oldPassword", {
            required: "Old password is required",
            minLength: { value: 8, message: "Must be at least 8 character" },
          })}
        />
        {errors.oldPassword && (
          <p className="text-error text-sm">{errors.oldPassword.message}</p>
        )}
        {/* New password */}

        <label className="label">
          <span className="label-test">New Password</span>
        </label>
        <input
          id="newPassword"
          type="password"
          placeholder="New Password"
          className="input input-bordered w-full"
          {...register("newPassword", {
            required: "New password is required",
            minLength: { value: 8, message: "Must be at least 8 character" },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
              message:
                "Please ensure your password includes at least one lowercase letter (a-z), one uppercase letter (A-Z), one number (0-9), or one special character.",
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-error text-sm">{errors.newPassword.message}</p>
        )}
        {/* Confirm password */}

        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === currentFormValues?.newPassword || "Passwords do not match",
          })}
          placeholder="Confirm Password"
          className="input input-bordered w-full"
        />
        {errors.confirmPassword && (
          <p className="text-error text-sm">{errors.confirmPassword.message}</p>
        )}
            <button type="submit" className="btn btn-primary w-full mt-4">
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}

export default PasswordResetForm;
