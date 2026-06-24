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
    emailId: string;
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
