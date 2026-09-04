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
    watch,
    formState: { errors },
  } = useForm<ResetPassword>({
    mode: "onChange"
  });
  const watchedNewPassword = watch("newPassword", "");
 
  return (
    <div className="w-full max-w-md">
      {errorMessage && (
        <div className="mb-4 rounded-lg border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
          {errorMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 rounded-3xl bg-base-200 p-6 shadow-lg shadow-base-200/50"
      >
        <div>
          <h2 className="text-2xl font-semibold">Change your password</h2>
          <p className="mt-2 text-sm text-base-content/70">
            Keep your account secure by using a strong password that includes uppercase, numbers, and symbols.
          </p>
        </div>

        <div className="space-y-2">
          <label className="label">
            <span className="label-text">Old Password</span>
          </label>
          <input
            id="oldPassword"
            type="password"
            placeholder="Old Password"
            autoComplete="current-password"
            className="input input-bordered w-full"
            {...register("oldPassword", {
              required: "Old password is required",
              minLength: { value: 8, message: "Must be at least 8 characters" },
            })}
          />
          {errors.oldPassword && (
            <p className="text-error text-sm">{errors.oldPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="New Password"
            autoComplete="new-password"
            className="input input-bordered w-full"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 8, message: "Must be at least 8 characters" },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
                message:
                  "Password must contain uppercase, a number, and a special character.",
              },
            })}
          />
          <p className="text-xs text-base-content/60">
            Use at least 8 characters and include uppercase, numbers, and symbols.
          </p>
          <div className="space-y-1">
            <p className={`text-xs font-medium flex items-center gap-2 ${
              watchedNewPassword.length >= 8 ? "text-success" : "text-base-content/50"
            }`}>
              <span>{watchedNewPassword.length >= 8 ? "✓" : "○"}</span> Min 8 characters
            </p>
            <p className={`text-xs font-medium flex items-center gap-2 ${
              /[A-Z]/.test(watchedNewPassword) ? "text-success" : "text-base-content/50"
            }`}>
              <span>{/[A-Z]/.test(watchedNewPassword) ? "✓" : "○"}</span> Uppercase letter
            </p>
            <p className={`text-xs font-medium flex items-center gap-2 ${
              /\d/.test(watchedNewPassword) ? "text-success" : "text-base-content/50"
            }`}>
              <span>{/\d/.test(watchedNewPassword) ? "✓" : "○"}</span> Number
            </p>
            <p className={`text-xs font-medium flex items-center gap-2 ${
              /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(watchedNewPassword)
                ? "text-success"
                : "text-base-content/50"
            }`}>
              <span>{/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(watchedNewPassword) ? "✓" : "○"}</span> Special character
            </p>
          </div>
          {errors.newPassword && (
            <p className="text-error text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watchedNewPassword || "Passwords do not match",
            })}
            placeholder="Confirm Password"
            className="input input-bordered w-full"
          />
          {errors.confirmPassword && (
            <p className="text-error text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-secondary w-full py-3">
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default PasswordResetForm;
