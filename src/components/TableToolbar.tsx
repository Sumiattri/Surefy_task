"use client";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setRows } from "../features/table/tableSlice";
import { Button, TextField, Stack } from "@mui/material";
import Papa from "papaparse";
import FileSaver from "file-saver";
import ManageColumnsModal from "./ManageColumnsModal";
import { setSearch } from "../features/ui/searchSlice";
import { setAllColumns } from "../features/ui/columnPrefsSlice";
import AddRowModal from "./AddRowModal"; // <-- Import

const TableToolbar: React.FC = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rows = useSelector((state: RootState) => state.table.rows);
  const search = useSelector((state: RootState) => state.search);

  const [modalOpen, setModalOpen] = useState(false);
  const [addRowOpen, setAddRowOpen] = useState(false); // <-- Add this line

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const importedRows = results.data.map((row: any, idx: number) => ({
          ...row,
          id: `${Date.now()}_${idx}`,
          age: Number(row.age),
        }));
        if (
          !["name", "email", "age", "role"].every((h) =>
            results.meta.fields.includes(h)
          )
        ) {
          alert("CSV must contain name, email, age, and role columns.");
          return;
        }
        const newColumns = results.meta.fields;
        dispatch(setAllColumns(newColumns));
        dispatch(setRows(importedRows));
      },
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "table_export.csv");
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <TextField
        label="Search"
        size="small"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <Button variant="contained" onClick={() => fileInputRef.current?.click()}>
        Import CSV
      </Button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImport}
      />
      <Button variant="contained" color="secondary" onClick={handleExport}>
        Export CSV
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => setAddRowOpen(true)}
      >
        Add Row
      </Button>
      <Button variant="outlined" onClick={() => setModalOpen(true)}>
        Manage Columns
      </Button>
      <ManageColumnsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      {/* THIS IS THE KEY LINE */}
      <AddRowModal open={addRowOpen} onClose={() => setAddRowOpen(false)} />
    </Stack>
  );
};

export default TableToolbar;
