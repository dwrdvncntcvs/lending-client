import { createSlice } from "@reduxjs/toolkit";

type ModalState = {
  status: boolean;
};

const initialState: ModalState = {
  status: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setModalStatus } = modalSlice.actions;

export default modalSlice.reducer;
