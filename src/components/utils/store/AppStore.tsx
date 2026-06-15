import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSliceReducer";

const AppStore = configureStore({
  reducer: {
    user: userReducer,
  },
   devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof AppStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof AppStore.dispatch;
export default AppStore;
