import userSignUpApi from "@/apis/userSignUpApi";
import SignUpForm from "@/components/SignUpForm/SignUpForm";
import type { UserSignUp, signUpResponse } from "@/utils/type/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { ErrorResponse } from "@/utils/type/commonType";

const SignUpPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  // Mutation
  const { mutate, isPending } = useMutation<
    signUpResponse,
    AxiosError<ErrorResponse>,
    UserSignUp
  >({
    mutationFn: userSignUpApi,

    onSuccess: (data) => {
      if (data?.data) {
        toast("Successfully Sign up");
        navigate("/login");
      }
    },

    onError: (error) => {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError?.response?.data?.message) {
        setErrorMessage(axiosError.response.data.message);
      } else {
        setErrorMessage(null);
      }
    },
  });
  const handleSignup = (data: UserSignUp) => {
    mutate(data);
  };

  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-base-200 px-4 py-8">
      <SignUpForm
        onSubmit={handleSignup}
        mode={"create-profile"}
        isPending={isPending}
        errorMessage={errorMessage}
      />
    </main>
  );
};

export default SignUpPage;
