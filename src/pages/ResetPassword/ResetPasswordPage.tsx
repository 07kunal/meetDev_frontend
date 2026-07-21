import PasswordResetForm from "@/components/PasswordResetForm/PasswordResetForm";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { ErrorResponse } from "@/components/utils/type/commonType";
import { useMutation } from "@tanstack/react-query";
import resetPasswordApi from "@/apis/resetPasswordApi";
import type {
  ResetPassword,
  resetPasswordResponse,
} from "@/components/utils/type/user";
import { useState } from "react";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending } = useMutation<
    resetPasswordResponse,
    AxiosError<ErrorResponse>,
    ResetPassword
  >({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      if (data?.data?.status) {
        toast("Password reset successfully");
        navigate("/login");
      }
    },

    onError: (error) => {
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(null);
      }
      console.error("Message:", error.response?.data?.message);
    },
  });

  const handleResetPassword = (data: ResetPassword) => {
    console.log(data,'tttttt');
    mutate(data);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <PasswordResetForm
        onSubmit={handleResetPassword}
        errorMessage={errorMessage}
        isPending={isPending}
      />
    </div>
  );
};

export default ResetPasswordPage;
