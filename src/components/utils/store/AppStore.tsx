import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSliceReducer";
import userFeedReducer from '../slices/userFeedSliceReducer';
const AppStore = configureStore({
  reducer: {
    user: userReducer,
    userFeed: userFeedReducer
  },
   devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof AppStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof AppStore.dispatch;
export default AppStore;
