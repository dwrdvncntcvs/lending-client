import { configureStore } from "@reduxjs/toolkit";
import borrowerReducer from "../features/borrowerSplice";

export const store = configureStore({
  reducer: {
    borrower: borrowerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
