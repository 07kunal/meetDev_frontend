import { createSlice } from "@reduxjs/toolkit";
import type { userFeedData } from "../type/usersFeeds";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialData: userFeedData = {
  message: "",
  data: [],
  totalCount: undefined,
  page: undefined,
  limit: undefined,
};

export const userFeedSliceReducer = createSlice({
  name: "User Feed",
  initialState: initialData,
  reducers: {
    setUserFeeds: (state, action: PayloadAction<userFeedData>) => {
      return action.payload;
    },
    clearUserFeeds: () => {
      return initialData;
    },
  },
});

export const { setUserFeeds, clearUserFeeds } = userFeedSliceReducer.actions;
export default userFeedSliceReducer.reducer;
