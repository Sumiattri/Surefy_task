"use client";

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setRows } from "../features/table/tableSlice";
import { Button, TextField, Stack } from "@mui/material";
import Papa from "papaparse";
import FileSaver from "file-saver";
import ManageColumnsModal from "./ManageColumnsModal";
import { useState } from "react";
import { setSearch } from "../features/ui/searchSlice";
import { setAllColumns } from "../features/ui/columnPrefsSlice";

const TableToolbar: React.FC = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rows = useSelector((state: RootState) => state.table.rows);

  const search = useSelector((state: RootState) => state.search);

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

        // --- THIS IS THE KEY PART: set columns to CSV headers
        const newColumns = results.meta.fields; // headers from CSV
        dispatch(setAllColumns(newColumns)); // <--- add this

        dispatch(setRows(importedRows));
      },
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "table_export.csv");
  };

  const [modalOpen, setModalOpen] = useState(false);

  // (You’ll connect search later for filtering!)
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <TextField
        label="Search"
        size="small"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />{" "}
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
      <Button variant="outlined" onClick={() => setModalOpen(true)}>
        Manage Columns
      </Button>
      <ManageColumnsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Stack>
  );
};

export default TableToolbar;
