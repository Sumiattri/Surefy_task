import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      return action.payload;
    },
    clearSearch(state) {
      return "";
    },
  },
});
export const { setSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
