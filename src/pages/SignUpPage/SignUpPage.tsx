import SignUpForm from "@/components/SignUpForm/SignUpForm";
import type { UserSignUp } from "@/components/utils/type/user";

const SignUpPage: React.FC = () => {
  const handleSignup = (data: UserSignUp) => {
    console.log("Signup Data:", data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <SignUpForm onSubmit={handleSignup} key={"create-profile"} />
    </div>
  );
};

export default SignUpPage;
