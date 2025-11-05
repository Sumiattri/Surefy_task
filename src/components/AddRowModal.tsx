"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRow } from "../features/table/tableSlice";
import { RootState } from "../store";
import { TableRow } from "../types/table";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddRowModal: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columnPrefs.visible);

  // Ensure all required TableRow keys (for TS strictness)
  const defaultFields = ["name", "email", "age", "role"]; // update if your TableRow type changes
  const allCols = Array.from(new Set([...defaultFields, ...columns]));

  const emptyFormObj: Record<string, string> = {};
  allCols.forEach((col) => {
    emptyFormObj[col] = "";
  });

  const [form, setForm] = useState<Record<string, string>>(emptyFormObj);

  useEffect(() => {
    if (open) {
      const fresh: Record<string, string> = {};
      allCols.forEach((col) => {
        fresh[col] = "";
      });
      setForm(fresh);
    }
  }, [open, columns.length]);

  const handleChange =
    (col: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [col]: e.target.value }));

  const handleSubmit = () => {
    // Build the new row object with correct types
    const newRow: TableRow = {
      id: `${Date.now()}_${Math.random()}`,
      name: form["name"],
      email: form["email"],
      age: Number(form["age"]),
      role: form["role"],
      ...form, // includes custom/extra columns if any
    };
    dispatch(addRow(newRow));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Row</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {allCols.map((col) => (
            <TextField
              key={col}
              label={col.charAt(0).toUpperCase() + col.slice(1)}
              value={form[col] || ""}
              onChange={handleChange(col)}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRowModal;
