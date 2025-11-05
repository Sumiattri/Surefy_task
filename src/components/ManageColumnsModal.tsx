import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setVisibleColumns,
  resetColumns,
  addColumn,
} from "../features/ui/columnPrefsSlice";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { RootState } from "../store";
import { addColumnToRows } from "../features/table/tableSlice";

const ManageColumnsModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.columnPrefs.visible);
  const allColumns = useSelector((state: RootState) => state.columnPrefs.all);
  const [selected, setSelected] = useState<string[]>(visible);
  const [newCol, setNewCol] = useState("");

  React.useEffect(() => {
    setSelected(visible);
  }, [visible]);

  const handleToggle = (col: string) => {
    setSelected((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const handleSave = () => {
    dispatch(setVisibleColumns(selected));
    onClose();
  };

  const handleAddCol = () => {
    const colName = newCol.trim();
    if (colName && !allColumns.includes(colName)) {
      dispatch(addColumn(colName));
      dispatch(addColumn(newCol));
      dispatch(addColumnToRows({ col: newCol }));
      setNewCol("");
    }
  };

  const handleReset = () => {
    setSelected([...allColumns]);
    dispatch(resetColumns());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <FormGroup>
          {allColumns.map((col) => (
            <FormControlLabel
              key={col}
              control={
                <Checkbox
                  checked={selected.includes(col)}
                  onChange={() => handleToggle(col)}
                />
              }
              label={col}
            />
          ))}
        </FormGroup>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="New column"
            size="small"
            value={newCol}
            onChange={(e) => setNewCol(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddCol}>
            Add
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset}>Show All</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageColumnsModal;
