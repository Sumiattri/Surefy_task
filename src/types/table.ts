// src/types/table.ts

export interface TableRow {
  id: string; // unique row ID
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: any; // for extensible columns later
}
