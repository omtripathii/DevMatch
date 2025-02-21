import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "Connections",
  initialState: [],
  reducers: {
    addConnection: (state, actions) => actions.payload,
    removeConnection: () => null,
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
