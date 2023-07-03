import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersReducer';

// Create a store with the auth reducer and any other reducers you need
export const store = configureStore({
  reducer: {
    users: usersReducer
  }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

