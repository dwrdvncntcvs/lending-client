import { configureStore } from "@reduxjs/toolkit";
import { borrowerReducer, loanPaymentReducer, loanReducer } from "../features";

export const store = configureStore({
  reducer: {
    borrowerState: borrowerReducer,
    loanState: loanReducer,
    loanPaymentState: loanPaymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
