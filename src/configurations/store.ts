import { configureStore } from "@reduxjs/toolkit";
import {
  borrowerReducer,
  loadingReducer,
  loanPaymentReducer,
  loanReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    borrowerState: borrowerReducer,
    loanState: loanReducer,
    loanPaymentState: loanPaymentReducer,
    loadingState: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
