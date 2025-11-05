"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleTheme } from "../features/ui/themeSlice";
import { Switch, FormControlLabel } from "@mui/material";

const ThemeToggle: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  return (
    <FormControlLabel
      control={
        <Switch
          checked={theme === "dark"}
          onChange={() => dispatch(toggleTheme())}
        />
      }
      label={theme === "dark" ? "Dark mode" : "Light mode"}
    />
  );
};
export default ThemeToggle;
