import { createSlice } from "@reduxjs/toolkit";
import type { userFeedData } from "../type/usersFeeds";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialData: userFeedData = {
  message: "",
  data: [],
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
    removeUserFromFeed: (
      state,
      action: PayloadAction<string>, // <-- userId
    ) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUserFeeds, clearUserFeeds,removeUserFromFeed } = userFeedSliceReducer.actions;
export default userFeedSliceReducer.reducer;
