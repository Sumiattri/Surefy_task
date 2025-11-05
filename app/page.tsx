import DataTable from "../src/components/DataTable";
import TableToolbar from "../src/components/TableToolbar";
import ThemeToggle from "@/components/ThemeToggle";
export default function Home() {
  return (
    <main>
      <h1 style={{ textAlign: "center" }}>Dynamic Data Table Manager</h1>
      <div style={{ maxWidth: 900, margin: "24px auto 0" }}>
        <ThemeToggle />
        <TableToolbar />
        <DataTable />
      </div>
    </main>
  );
}
