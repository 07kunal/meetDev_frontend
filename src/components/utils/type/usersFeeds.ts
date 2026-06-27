// Define the generic array-of-objects type
export type Collection<T extends object> = T[];

export interface userFeeds {
  data: {
    firstName: string;
    lastName: string;
    gender: string;
    age: number | null;
    education: string[];
    profilePic: string;
    skills: string[];
  }
}
