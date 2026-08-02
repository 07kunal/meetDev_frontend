import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { userPendingRequest } from "../type/userConnection";
const initialData: userPendingRequest = {
  message: "",
  data: [],
  totalCount: undefined,
  page: undefined,
  limit: undefined,
};

export const userPendingRequestSliceReducer = createSlice({
  name: "User Feed",
  initialState: initialData,
  reducers: {
    setUserPendingRequest: (
      state,
      action: PayloadAction<userPendingRequest>,
    ) => {
      return action.payload;
    },
    clearUserPendingReques: () => {
      return initialData;
    },
  },
});

export const { setUserPendingRequest, clearUserPendingReques } =
  userPendingRequestSliceReducer.actions;
export default userPendingRequestSliceReducer.reducer;
