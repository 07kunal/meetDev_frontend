// export type Collection<T extends object> = T[];

import type { Collection } from "./usersFeeds";

export interface toUserIdPendingRequest {
  id: string;
  fromUserId: {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number | null;
    profilePic: string;
    skills: string[];
    fullName: string;
  };
  toUserId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface userPendingRequest {
  message: string;
  data: Collection<toUserIdPendingRequest>;
}
