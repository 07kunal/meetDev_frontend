import { createSlice } from "@reduxjs/toolkit";
import type { LoginResponse, User } from "../type/user";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialUserData: LoginResponse = {
  data: {
    firstName: "",
    lastName: "",
    gender: "",
    age: null,
    education: [],
    address: "",
    profilePic: "",
    skills: [],
  },
  status: false,
  isAuthenticated: false,
  isLoading: true,
};
export const userSliceReducer = createSlice({
  name: "userData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialUserData,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.status = true;
    },
    clearUser: () => {
      // console.log("CLEAR USER");
      return { ...initialUserData, isLoading: false };
    },
  },
});
export const { setUser, clearUser } = userSliceReducer.actions;
export default userSliceReducer.reducer;
