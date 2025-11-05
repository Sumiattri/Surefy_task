"use client";
import { useSelector } from "react-redux";
import { RootState } from "../src/store";
import { Provider } from "react-redux";
import { store, persistor } from "../src/store";
import { PersistGate } from "redux-persist/integration/react";

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  PaletteMode,
} from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <InnerLayout>{children}</InnerLayout>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  const themeMode = useSelector((state: RootState) => state.theme);
  const theme = createTheme({
    palette: { mode: themeMode as PaletteMode }, // Type assertion
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
