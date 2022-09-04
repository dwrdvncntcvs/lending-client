import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  message: "",
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    setLoadingMessage: (state, action) => {
      return { ...state, message: action.payload };
    },
  },
});

export const { setLoadingMessage, setLoadingStatus } = loadingSlice.actions;

export default loadingSlice.reducer;
