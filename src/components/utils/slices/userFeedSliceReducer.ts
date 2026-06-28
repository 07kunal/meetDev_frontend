import { createSlice } from "@reduxjs/toolkit";
import type { Collection, userFeeds } from "../type/usersFeeds";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialData: Collection<userFeeds> = [
  {
    data: {
      firstName: "",
      lastName: "",
      gender: "",
      age: null,
      education: [],
      profilePic: "",
      skills: [],
    },
  },
];

export const userFeedSliceReducer = createSlice({
  name: "User Feed",
  initialState: initialData,
  reducers: {
    setUserFeeds: (state, action: PayloadAction<Collection<userFeeds>>) => {
      console.log("SET USER Feed", action.payload);
      return action.payload;
    },
    clearUserFeeds: () => {
      console.log("CLEAR USER Feed");
      return initialData;
    },
  },
});

export const {setUserFeeds,clearUserFeeds} = userFeedSliceReducer.actions;
export default userFeedSliceReducer.reducer;
