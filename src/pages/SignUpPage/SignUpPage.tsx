import userSignUpApi from "@/apis/userSignUpApi";
import SignUpForm from "@/components/SignUpForm/SignUpForm";
import type { UserSignUp, signUpResponse } from "@/components/utils/type/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ErrorResponse {
  message: string;
}
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
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(null);
      }
      console.error("Message:", error.response?.data?.message);
    },
  });
  const handleSignup = (data: UserSignUp) => {
    mutate(data);
    console.log("Signup Data:", data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <SignUpForm
        onSubmit={handleSignup}
        mode={"create-profile"}
        isPending={isPending}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default SignUpPage;
