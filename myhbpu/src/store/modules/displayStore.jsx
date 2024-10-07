import { createSlice } from "@reduxjs/toolkit";

const displayStore = createSlice({
  name: "displayStore",
  initialState: {
    isModalOpen: false,
    display: "",
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setDisplay: (state, action) => {
      state.display = action.payload;
    },
  },
});

export const { openModal, closeModal, setDisplay } = displayStore.actions;
export default displayStore.reducer;
