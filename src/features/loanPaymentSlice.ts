import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoanPayment, TotalPayment } from "../models/LoanPayment";
import { getRequest } from "../services/httpService";
import { URL } from "../utils/variables";

export type LoanPaymentState = {
  loanPayments: LoanPayment[];
  totalPayments: TotalPayment;
};

const initialState: LoanPaymentState = {
  loanPayments: [],
  totalPayments: {},
};

export const getLoanPayments = createAsyncThunk(
  "loanPayment/getLoanPayments",
  async (loanId: string) => {
    const response = await getRequest(`${URL.lending}/loan/${loanId}/payments`);

    const data: LoanPayment[] = response.data;
    return data;
  }
);

export const getTotalLoanPayments = createAsyncThunk(
  "loanPayment/getTotalLoanPayments",
  async (loanId: string) => {
    const response = await getRequest(
      `${URL.lending}/loan/${loanId}/payments/total`
    );

    const data: TotalPayment = response.data;
    return data;
  }
);

const loanPaymentSlice = createSlice({
  name: "loanPayment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLoanPayments.pending, (state) => {
        console.log("Pending...");
      })
      .addCase(getLoanPayments.fulfilled, (state, action) => {
        return { ...state, loanPayments: action.payload };
      })
      .addCase(getLoanPayments.rejected, (state) => {
        console.log("Rejected...");
      });

    builder
      .addCase(getTotalLoanPayments.pending, (state) => {
        console.log("Pending...");
      })
      .addCase(getTotalLoanPayments.fulfilled, (state, action) => {
        return { ...state, totalPayments: action.payload };
      })
      .addCase(getTotalLoanPayments.rejected, (state) => {
        console.log("Rejected...");
      });
  },
});

export default loanPaymentSlice.reducer;
