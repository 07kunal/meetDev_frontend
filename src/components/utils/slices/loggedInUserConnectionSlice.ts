import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { loggedInUserConnectionDataType } from "../type/userConnection";
const initialData: loggedInUserConnectionDataType = {
  message: "",
  data: [],
  totalCount: undefined,
  page: undefined,
  limit: undefined,
};

export const loggedInUserConnectionSliceReducer = createSlice({
  name: "User Feed",
  initialState: initialData,
  reducers: {
    setUserConnections: (
      state,
      action: PayloadAction<loggedInUserConnectionDataType>,
    ) => {
      return action.payload;
    },
    clearUserConnections: () => {
      return initialData;
    },
  },
});

export const { setUserConnections, clearUserConnections } =
  loggedInUserConnectionSliceReducer.actions;
export default loggedInUserConnectionSliceReducer.reducer;
