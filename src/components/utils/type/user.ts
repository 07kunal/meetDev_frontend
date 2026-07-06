export interface LoginBody {
  emailId: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  gender: string;
  age: number | null;
  education: string[];
  address: string;
  profilePic: string;
  skills: string[];
}

export interface LoginResponse {
  data: User;
  status?: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface logOutResponse {
  data: {
    logOutStatus: boolean;
    message: string;
  };
}

export interface UserProfile {
  data: User;
}

/*
ENUM
 Unlike most TypeScript features which disappear during compilation, enums are a language extension that generates an actual JavaScript object at runtime.
*/
