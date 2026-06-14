export interface LoginBody {
  emailId: string;
  password: string;
}

export interface LoginResponse {
  firstName: string;
  lastName: string;
  gender: string;
  age: number | null;
  emailId: string;
  education: string[];
  address: string;
  profilePic: string;
  skills: string[];
  status?: Boolean;
}

