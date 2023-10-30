import { configureStore } from '@reduxjs/toolkit';
import formsReducder from './form';
import submissionReducer from './submissions';

export const store = configureStore({
  reducer: {
    forms: formsReducder,
    submissions: submissionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch