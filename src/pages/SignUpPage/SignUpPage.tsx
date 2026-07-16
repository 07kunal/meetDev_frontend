import SignUpForm from "@/components/SignUpForm/SignUpForm";
import type { UserSignUp } from "@/components/utils/type/user";
import toast from "react-hot-toast";

const SignUpPage: React.FC = () => {
  const handleSignup = (data: UserSignUp) => {
    toast('Successfully Sign up');
    console.log("Signup Data:", data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <SignUpForm onSubmit={handleSignup} key={"create-profile"} />
    </div>
  );
};

export default SignUpPage;
