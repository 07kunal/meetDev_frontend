import PasswordResetForm from "@/components/PasswordResetForm/PasswordResetForm";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { ErrorResponse } from "@/components/utils/type/commonType";
import { useMutation } from "@tanstack/react-query";
import resetPasswordApi from "@/apis/resetPasswordApi";
import type {
  ResetPassword,
  resetPasswordResponse,
} from "@/components/utils/type/user";
import { useState } from "react";
import { useTokenExpiredMethod } from "@/components/utils/customHooks/useTokenExpiredMethod";

const ResetPasswordPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tokenExpiredMethod = useTokenExpiredMethod();
  const { mutate, isPending } = useMutation<
    resetPasswordResponse,
    AxiosError<ErrorResponse>,
    ResetPassword
  >({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      if (data?.data?.status) {
        tokenExpiredMethod();
        window.location.reload();
        toast("Password reset successfully");
      }
    },

    onError: (error) => {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError?.response?.data?.status === 401) {
        tokenExpiredMethod();
      }
      if (axiosError?.response?.data?.message) {
        setErrorMessage(axiosError.response.data.message);
      } else {
        setErrorMessage(null);
      }
    },
  });

  const handleResetPassword = (data: ResetPassword) => {
    mutate(data);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-100 p-8 shadow-xl shadow-base-200/80">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Enter your current password and choose a strong new password to
            update your account.
          </p>
        </div>

        <PasswordResetForm
          onSubmit={handleResetPassword}
          errorMessage={errorMessage}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
