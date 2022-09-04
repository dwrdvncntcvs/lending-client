import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { g_axios } from "../configurations/axios";
import { Borrower, BorrowerWithLoan } from "../models/Borrower";
import { LoanCount } from "../models/Loan";
import { getRequest } from "../services/httpService";
import { URL } from "../utils/variables";

export interface BorrowerState {
  borrowers: Borrower[];
  borrower: Borrower & LoanCount;
}

const initialState: BorrowerState = {
  borrowers: [],
  borrower: {},
};

export const getBorrowers = createAsyncThunk(
  "borrower/getBorrowers",
  async () => {
    console.log("Getting Borrowers...");

    const url = `${URL.lending}/borrowers`;
    const response = await getRequest(url);
    const data: Borrower[] = response.data;

    console.log("Data: ", data);

    return data;
  }
);

export const getBorrowerById = createAsyncThunk(
  "borrower/getBorrowerById",
  async (borrowerId: string) => {
    const response = await axios({
      method: "GET",
      url: `${g_axios.defaults.baseURL}/borrowers/${borrowerId}`,
      responseType: "json",
    });

    console.log("Response: ", response.data);

    return response.data;
  }
);

const borrowerSlice = createSlice({
  name: "borrower",
  initialState,
  reducers: {
    addBorrower: (state, action: PayloadAction<BorrowerState>) => {
      console.log(state);
      console.log(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBorrowers.pending, (state) => {
        console.log("Pending...");
      })
      .addCase(getBorrowers.fulfilled, (state, action) => {
        const borrowers: Borrower[] = action.payload;

        return { ...state, borrowers };
      })
      .addCase(getBorrowers.rejected, (state) => {
        console.log("Rejected...");
        return state;
      });

    builder
      .addCase(getBorrowerById.pending, (state) => {
        console.log("Pending...");
      })
      .addCase(getBorrowerById.fulfilled, (state, action) => {
        const borrower: Borrower = action.payload;

        return { ...state, borrower };
      })
      .addCase(getBorrowerById.rejected, (state) => {
        console.log("Rejected...");
      });
  },
});

export const { addBorrower } = borrowerSlice.actions;

export default borrowerSlice.reducer;
