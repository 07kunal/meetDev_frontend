export interface LoginBody {
  emailId: string;
  password: string;
}
export interface userEditProfile {
  age?: number;
  profilePic?: string;
  education?: string[];
  skills?: string[];
  address?: string;
  about?:string;
  gender?:string
}
export interface ResetPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}
export interface SignUpData {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  confirmPassword?: string;
}
export interface User {
  firstName: string;
  lastName: string;
  gender: string;
  age: number | null;
  userName?: string | null;
  education: string[];
  address: string;
  profilePic: string;
  skills: string[];
  id?: string;
  about?: string
}
export interface logOutResponse {
  data: {
    logOutStatus: boolean;
    message: string;
  };
}

export interface UserProfile {
  data: User;
  status: boolean;
  authChecked?: boolean;
  message?: string
}
export interface UserSignUp {
  data: SignUpData;
}
export interface signUpResponse {
  data: string;
}

export interface resetPasswordResponse {
  data: {
    message: string;
    status: boolean;
  };
}

/*
ENUM
 Unlike most TypeScript features which disappear during compilation, enums are a language extension that generates an actual JavaScript object at runtime.
*/
