import { configureStore } from "@reduxjs/toolkit";
import { borrowerReducer, loanReducer } from "../features";

export const store = configureStore({
  reducer: {
    borrowerState: borrowerReducer,
    loanState: loanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
