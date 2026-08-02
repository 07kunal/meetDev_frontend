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
  totalCount?: number;
  page?: number;
  limit?: number;
}

// LoggedIn user Connections

export interface loggedInUserConnectionType {
  requestId: string;
  data: {
    firstName: string;
    lastName: string;
    gender: string;
    age: number | null;
    education: string[];
    profilePic: string;
    skills: string[];
    fullName: string;
    id?: string;
  };
}
export interface loggedInUserConnectionDataType {
  message: string;
  data: Collection<loggedInUserConnectionType>;
  totalCount?: number;
  page?: number;
  limit?: number;
}

// Review pending request response

export interface reviewUserPendingRequestType {
  message: string;
  status: string;
}
