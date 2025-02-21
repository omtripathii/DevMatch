import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "Requests",
  initialState: [],
  reducers: {
    addRequests: (state, actions) => actions.payload,
    removeRequests: () => null,
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;
