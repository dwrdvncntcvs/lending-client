import { configureStore } from "@reduxjs/toolkit";
import { loanReducer } from "../features";
import borrowerReducer from "../features/borrowerSplice";

export const store = configureStore({
  reducer: {
    borrower: borrowerReducer,
    loan: loanReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
