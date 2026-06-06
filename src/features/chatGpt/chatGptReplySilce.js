import { createSlice } from "@reduxjs/toolkit";

const chatGptReplySlice = createSlice({
  name: "chatGptReply",
  initialState: {
    OutputItems: [], // 👈 change to "chat" to test instantly
  },
  reducers: {
    setOutputItems: (state, action) => {
      state.OutputItems = action.payload;
    },
    clearOutputItems: (state) => {
      state.OutputItems = [];
    },
}}
);

export const { setOutputItems, clearOutputItems } = chatGptReplySlice.actions;
export default chatGptReplySlice.reducer;