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

type Props = {
  open: boolean;
  row: any;
  onSave: (newRow: any) => void;
  onClose: () => void;
  allColumns: string[];
};

const RawEditForm: React.FC<Props> = ({
  open,
  row,
  onSave,
  onClose,
  allColumns,
}) => {
  const [formState, setFormState] = useState({ ...row });

  useEffect(() => {
    setFormState({ ...row });
  }, [row]);

  if (!row) return null;

  const handleInput =
    (col: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev: any) => ({ ...prev, [col]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {allColumns
              .filter((col) => col !== "id")
              .map((col) => (
                <TextField
                  key={col}
                  label={col.charAt(0).toUpperCase() + col.slice(1)}
                  value={formState[col] ?? ""}
                  onChange={handleInput(col)}
                  fullWidth
                />
              ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RawEditForm;
