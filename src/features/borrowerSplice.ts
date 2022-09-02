import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { g_axios } from "../configurations/axios";
import { BorrowerWithLoan } from "../models/Borrower";

export interface BorrowerState {
  borrowers: BorrowerWithLoan[];
}

const initialState: BorrowerState = {
  borrowers: [],
};

export const getBorrowers = createAsyncThunk(
  "borrower/addBorrower",
  async () => {
    console.log("Getting Borrowers...");

    const response = await axios({
      method: "GET",
      url: `${g_axios.defaults.baseURL}/borrowers`,
      responseType: "json",
    });
    const data: BorrowerWithLoan[] = response.data;

    console.log("Data: ", data);

    return data;
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
        const borrowers: BorrowerWithLoan[] = action.payload!.map(
          (borrower: BorrowerWithLoan) => ({
            ...borrower,
          })
        );

        return { ...state, borrowers };
      })
      .addCase(getBorrowers.rejected, (state) => {
        console.log("Rejected...");
        return state;
      });
  },
});

export const { addBorrower } = borrowerSlice.actions;

export default borrowerSlice.reducer;
