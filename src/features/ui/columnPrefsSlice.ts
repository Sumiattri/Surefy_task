// src/features/ui/columnPrefsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const allColumns = ["name", "email", "age", "role"];

const initialState: { visible: string[] } = {
  visible: [...allColumns], // initially, all are visible
};

const columnPrefsSlice = createSlice({
  name: "columnPrefs",
  initialState: {
    visible: ["name", "email", "age", "role"], // default
    all: ["name", "email", "age", "role"],
  },
  reducers: {
    setVisibleColumns(state, action: PayloadAction<string[]>) {
      state.visible = action.payload;
    },
    resetColumns(state) {
      state.visible = [...state.all];
    },
    addColumn(state, action: PayloadAction<string>) {
      if (!state.all.includes(action.payload)) {
        state.all.push(action.payload);
        state.visible.push(action.payload);
      }
    },
    setAllColumns(state, action: PayloadAction<string[]>) {
      state.all = action.payload;
      state.visible = action.payload;
    },
  },
});

export const { setVisibleColumns, resetColumns, addColumn, setAllColumns } =
  columnPrefsSlice.actions;
export default columnPrefsSlice.reducer;
