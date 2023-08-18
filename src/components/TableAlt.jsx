import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

const TableAlt = ({ columns, rows }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={rows}
      enableBottomToolbar={false}
      enableColumnFilterModes
      enableRowVirtualization
      enableRowNumbers
      //   enableColumnResizing
      enableStickyHeader={true}
      enablePagination={false}
      initialState={{ showColumnFilters: true }}
      muiTableBodyProps={{
        sx: {
          border: "1px solid #eeeeee",
          borderRadius: 5,
        },
      }}
      muiTableHeadProps={{
        sx: {
          border: "1px solid #eeeeee",
          borderRadius: 5,
        },
      }}
      muiBottomToolbarProps={{
        sx: {
          border: "1px solid #eeeeee",
          borderRadius: 5,
        },
      }}
      muiTableContainerProps={{ sx: { maxHeight: "900px", maxWidth: "90vw" } }}
      muiTableProps={{
        sx: {
          tableLayout: "fixed",
          borderRadius: 7,
        },
      }}
      muiTablePaperProps={{ sx: { boxShadow: 0, borderRadius: 5, border: "1px solid #e0e0e0" } }}
    />
  );
};

export default TableAlt;
