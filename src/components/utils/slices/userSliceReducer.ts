import { createSlice } from "@reduxjs/toolkit";
import type { LoginResponse } from "../type/user";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialUserData: LoginResponse = {
  data: {
    firstName: "",
    lastName: "",
    age: null,
    profilePic: "",
    skills: [],
    education: [],
    gender: "",
    address: "",
  },
  status: false
};
export const userSliceReducer = createSlice({
  name: "userData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialUserData,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      // console.log("SET USER", action.payload);
      return action.payload;
    },
    clearUser: () => {
        // console.log("CLEAR USER");
      return initialUserData;
    },
  },
});
export const { setUser, clearUser } = userSliceReducer.actions;
export default userSliceReducer.reducer;
