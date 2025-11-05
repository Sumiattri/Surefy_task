import { useState, useEffect } from "react";

export default function usePagination<T>(data: T[], rowsPerPage: number = 10) {
  const [page, setPage] = useState(0);

  // When the data changes (like after CSV import), reset to first page
  useEffect(() => {
    setPage(0);
  }, [data.length]);

  const paginatedData = data.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const maxPage = Math.ceil(data.length / rowsPerPage);

  return { paginatedData, page, setPage, maxPage };
}
