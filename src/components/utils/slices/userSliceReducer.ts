import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../type/user";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialUserData: UserProfile = {
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
  authChecked: false,
};
export const userSliceReducer = createSlice({
  name: "userData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialUserData,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      return {
        ...action.payload,
        authChecked: true,
      };
    },
    setAuthChecked: (state) => {
      return {
        ...state,
        authChecked: true,
      };
    },
    clearUser: () => {
      return {
        ...initialUserData,
        authChecked: true,
      };
    },
  },
});
export const { setUser, clearUser,setAuthChecked } = userSliceReducer.actions;
export default userSliceReducer.reducer;
