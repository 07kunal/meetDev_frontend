import ProfileUpdateForm from "@/components/ProfileUpdateForm/ProfileUpdateForm";
import type { UserProfile } from "@/components/utils/type/user";

const SignUpPage: React.FC = () => {
  const handleSignup = (data: UserProfile) => {
    console.log("Signup Data:", data);
  };

  return <ProfileUpdateForm onSubmit={handleSignup} key={'create-profile'}/>;
};

export default SignUpPage;
