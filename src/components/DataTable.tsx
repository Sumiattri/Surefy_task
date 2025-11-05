"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
} from "@mui/material";
import usePagination from "../hooks/usePagination";
import RawEditForm from "./RawEditForm";
import { deleteRow, updateRow } from "../features/table/tableSlice";
import { TableRow as TableRowType } from "../types/table";

const columnLabels: { [key: string]: string } = {
  name: "Name",
  email: "Email",
  age: "Age",
  role: "Role",
};

const DataTable: React.FC = () => {
  const rows = useSelector((state: RootState) => state.table.rows);
  const visible = useSelector((state: RootState) => state.columnPrefs.visible);
  const allColumns = useSelector((state: RootState) => state.columnPrefs.all); // for modal
  const search = useSelector((state: RootState) => state.search);

  const filteredRows = rows.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );
  const { paginatedData, page, setPage } = usePagination(filteredRows, 10);

  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState<TableRowType | null>(null);

  const getRowKey = (row: any, idx: number) =>
    row.id && row.id !== "" ? row.id : `row-${idx}`;

  const onEdit = (row: TableRowType) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const onEditSave = (newRow: TableRowType) => {
    dispatch(updateRow(newRow));
    setEditOpen(false);
    setEditRow(null);
  };

  const onDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteRow(id));
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 6 }}>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 900, margin: "auto", maxHeight: 550 }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {visible.map((col) => (
                <TableCell key={col}>
                  {columnLabels[col] ? columnLabels[col] : col}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, idx) => (
              <TableRow key={getRowKey(row, idx)}>
                {visible.map((col) => (
                  <TableCell key={col}>{row[col] ?? " "}</TableCell>
                ))}
                <TableCell>
                  <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(row.id)}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
      <RawEditForm
        open={editOpen}
        row={editRow}
        onSave={onEditSave}
        onClose={() => setEditOpen(false)}
        allColumns={allColumns}
      />
    </Box>
  );
};

export default DataTable;
