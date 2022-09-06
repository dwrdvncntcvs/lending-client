import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoanPayment, PaymentData, TotalPayment } from "../models/LoanPayment";
import { getRequest, putRequest } from "../services/httpService";
import { URL } from "../utils/variables";

export type LoanPaymentState = {
  loanPayments: LoanPayment[];
  totalPayments: TotalPayment;
};

type UpdatePayment = {
  loanId: string;
  paymentId: string;
  data: PaymentData;
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

export const updateLoanPayment = createAsyncThunk(
  "loanPayment/updateLoanPayment",
  async ({ loanId, paymentId, data }: UpdatePayment, { dispatch }) => {
    const url = `${URL.lending}/loan/${loanId}/payment/${paymentId}`;

    await putRequest(url, data);
    await dispatch(getLoanPayments(loanId));
    await dispatch(getTotalLoanPayments(loanId));
  }
);

const loanPaymentSlice = createSlice({
  name: "loanPayment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //Getting Loan Payment Builder
    builder
      .addCase(getLoanPayments.pending, (state) => {
        console.log("Pending Loan Payments...");
      })
      .addCase(getLoanPayments.fulfilled, (state, action) => {
        return { ...state, loanPayments: action.payload };
      })
      .addCase(getLoanPayments.rejected, (state) => {
        console.log("Rejected...");
      });

    //Getting Total Loan Payment Builder
    builder
      .addCase(getTotalLoanPayments.pending, (state) => {
        console.log("Pending Total Loan Payments...");
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
