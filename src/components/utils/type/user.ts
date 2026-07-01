export interface LoginBody {
  emailId: string;
  password: string;
}

export interface LoginResponse {
  data: {
    firstName: string;
    lastName: string;
    gender: string;
    age: number | null;
    education: string[];
    address: string;
    profilePic: string;
    skills: string[];
  };
  status?: boolean;
}

export interface logOutResponse {
  data: {
    logOutStatus: boolean;
    message: string;
  };
}

export interface UserProfile {
  data: {
    firstName: string;
    lastName: string;
    gender: string;
    age: number | null;
    education: string[];
    address: string;
    profilePic: string;
    skills: string[];
  };
}

/*
ENUM
 Unlike most TypeScript features which disappear during compilation, enums are a language extension that generates an actual JavaScript object at runtime.
*/
