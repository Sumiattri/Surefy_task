// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./features/table/tableSlice";
import columnPrefsReducer from "./features/ui/columnPrefsSlice";
import searchReducer from "./features/ui/searchSlice";
import themeReducer from "./features/ui/themeSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    columnPrefs: columnPrefsReducer,
    search: searchReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
