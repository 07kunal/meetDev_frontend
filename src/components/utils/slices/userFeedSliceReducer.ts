import { createSlice } from "@reduxjs/toolkit";
import type { Collection, userFeeds } from "../type/usersFeeds";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialData: Collection<userFeeds> = [
  {
    firstName: "",
    lastName: "",
    fullName: "",
    gender: "",
    age: null,
    education: [],
    profilePic: "",
    skills: [],
  },
];

export const userFeedSliceReducer = createSlice({
  name: "User Feed",
  initialState: initialData,
  reducers: {
    setUserFeeds: (state, action: PayloadAction<Collection<userFeeds>>) => {
      return action.payload;
    },
    clearUserFeeds: () => {
      return initialData;
    },
  },
});

export const { setUserFeeds, clearUserFeeds } = userFeedSliceReducer.actions;
export default userFeedSliceReducer.reducer;
