export interface LoginBody {
  emailId: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  gender: string;
  age: number | null;
  userName: string | null
  education: string[];
  address: string;
  profilePic: string;
  skills: string[];
  _id?: string
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

}

/*
ENUM
 Unlike most TypeScript features which disappear during compilation, enums are a language extension that generates an actual JavaScript object at runtime.
*/
