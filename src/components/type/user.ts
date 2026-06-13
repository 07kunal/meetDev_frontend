export interface LoginBody {
  emailId: string;
  password: string;
}

export interface LoginResponse {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  emailId: string;
  education: string[];
  address: string;
  profilePic: string;
  skills: string;
  status: Boolean;
}

