import { createSlice } from "@reduxjs/toolkit";

const chatGptSlice = createSlice({
  name: "chatGpt",
  initialState: {
    mode: "browse", // 👈 change to "chat" to test instantly
  },
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "chat" ? "browse" : "chat";
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleMode, setMode } = chatGptSlice.actions;
export default chatGptSlice.reducer;