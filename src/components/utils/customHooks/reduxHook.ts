// Even Better: Create Typed Hooks
import { useSelector,useDispatch} from "react-redux";
import type {TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/AppStore";

// Hook one for dispatch the action . 
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook two that tell the type of store. 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


/*
What is AppDispatch?

In store.ts:

export type AppDispatch = typeof store.dispatch;

TypeScript extracts the exact type of your dispatch function.

Typed Redux
const dispatch = useDispatch<AppDispatch>();

Now TypeScript knows:

dispatch(loginUser())
dispatch(logout())
dispatch(fetchUser())

and their expected payloads.

What is RootState?

In store.ts:

export type RootState = ReturnType<typeof store.getState>;

Suppose your store is:

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

Then TypeScript infers:

type RootState = {
  user: UserState;
  auth: AuthState;
};


*/




// ====================================
/* 
Topic to understand 
TypeUseSelectorHook<RootState> 
means:

Create a selector hook where the state parameter is always RootState.
As mention above, 

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;

This says:

Take the existing useSelector and treat it as a version that always receives RootState.
==============
Store
 │
 ├── RootState
 │
 ├── AppDispatch
 │
 ▼

useAppDispatch
 │
 └── useDispatch<AppDispatch>()

useAppSelector
 │
 └── useSelector with RootState

 ▼

Component

const dispatch = useAppDispatch();

const user = useAppSelector(
  state => state.user
);


================

1. Type Redux once
2. Create typed hooks once
3. Never write RootState or AppDispatch in components again
4. Get autocomplete and type safety everywhere
*/