import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableRow } from "../../types/table";

const initialData: TableRow[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    age: 23,
    role: "Admin",
  },
  { id: "2", name: "Bob", email: "bob@example.com", age: 25, role: "User" },
];

interface TableState {
  rows: TableRow[];
}

const initialState: TableState = {
  rows: initialData,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<TableRow[]>) {
      state.rows = action.payload;
    },
    replaceRows(state, action: PayloadAction<TableRow[]>) {
      state.rows = action.payload;
    },
    addRow(state, action: PayloadAction<TableRow>) {
      state.rows.push(action.payload);
    },
    addColumnToRows: (state, action: PayloadAction<{ col: string }>) => {
      state.rows = state.rows.map((row) => ({
        ...row,
        [action.payload.col]: "",
      }));
    },
    updateRow(state, action: PayloadAction<TableRow>) {
      const idx = state.rows.findIndex((r) => r.id === action.payload.id);
      if (idx !== -1) state.rows[idx] = action.payload;
    },
    deleteRow(state, action: PayloadAction<string>) {
      state.rows = state.rows.filter((r) => r.id !== action.payload);
    },
  },
});

export const {
  setRows,
  replaceRows,
  addRow,
  updateRow,
  deleteRow,
  addColumnToRows,
} = tableSlice.actions;
export default tableSlice.reducer;
