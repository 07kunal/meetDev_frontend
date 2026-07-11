import SignUpForm from "@/components/SignUpForm/SignUpForm";
import type { UserProfile } from "@/components/utils/type/user";

const SignUpPage: React.FC = () => {
  const handleSignup = (data: UserProfile) => {
    console.log("Signup Data:", data);
  };

  return <SignUpForm onSubmit={handleSignup} />;
};

export default SignUpPage;
