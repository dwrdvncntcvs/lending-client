import { configureStore } from "@reduxjs/toolkit";
import {
  borrowerReducer,
  loadingReducer,
  loanPaymentReducer,
  loanReducer,
  modalReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    borrowerState: borrowerReducer,
    loanState: loanReducer,
    loanPaymentState: loanPaymentReducer,
    loadingState: loadingReducer,
    modalState: modalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
