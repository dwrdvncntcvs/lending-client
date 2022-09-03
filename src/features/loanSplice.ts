import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { g_axios } from "../configurations/axios";
import { Loan } from "../models/Loan";
import { getRequest } from "../services/httpService";
import { URL } from "../utils/variables";

export interface LoanState {
  loans: Loan[];
  loan: Loan;
}

export const getLoanRequest = createAsyncThunk(
  "loan/getLoan",
  async (borrowerId: string) => {
    const url = `${URL.lending}/loans/${borrowerId}`;
    const response = await getRequest(url);

    const data: Loan[] = response.data;
    console.log("Loan Data: ", data);

    return data;
  }
);

const initialState: LoanState = {
  loans: [],
  loan: {},
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setDefaultLoan: (state, action) => {
      console.log("Setting default");
      return { ...state, loan: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLoanRequest.pending, (state) => {
        console.log("Pending...");
      })
      .addCase(getLoanRequest.fulfilled, (state, action) => {
        return { ...state, loans: action.payload };
      })
      .addCase(getLoanRequest.rejected, (state, action) => {
        console.log("Failed...");
        console.log(action);
        return state;
      });
  },
});

export const { setDefaultLoan } = loanSlice.actions;

export default loanSlice.reducer;
