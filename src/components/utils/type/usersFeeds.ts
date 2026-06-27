// Define the generic array-of-objects type
// If you want to ensure the generic parameter passed to the array is strictly an object
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
