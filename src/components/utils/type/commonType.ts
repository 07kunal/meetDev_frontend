export type Boolean = true | false;
export interface params {
  page: number;
  limit: number;
}
export interface ErrorResponse {
  message: string;
  status?: boolean;
}

export type Education = {
  degree: string;
};
export type Skill = {
  name: string;
};
export interface pendingRequestProps {
  status: string;
  pendingRequestId: string;
}
