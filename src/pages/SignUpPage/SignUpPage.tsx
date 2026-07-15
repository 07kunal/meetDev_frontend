import SignUpForm from "@/components/SignUpForm/SignUpForm";
import type { UserSignUp } from "@/components/utils/type/user";

const SignUpPage: React.FC = () => {
  const handleSignup = (data: UserSignUp) => {
    console.log("Signup Data:", data);
  };

  return <SignUpForm onSubmit={handleSignup} key={'create-profile'}/>;
};

export default SignUpPage;
