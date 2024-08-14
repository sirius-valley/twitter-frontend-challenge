import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import post from "./post";

export const store = configureStore({
  reducer: { user, post }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
