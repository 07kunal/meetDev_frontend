// export type Collection<T extends object> = T[];

import type { Collection } from "./usersFeeds";

export interface myIncommingPendingRequest {
  _id: string;
  fromUserId: {
    id?: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number | null;
    profilePic: string;
    skills: string[];
    fullName: string;
    education: string[];
  };
  toUserId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface userPendingRequest {
  message: string;
  data: Collection<myIncommingPendingRequest>;
  totalItems?: number;
  page?: number;
  limit?: number;
}
