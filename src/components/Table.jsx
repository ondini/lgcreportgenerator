import React from "react";
import { MaterialReactTable } from "material-react-table";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton } from "@mui/material";

import { ExportToCsv } from "export-to-csv";

const Table = ({ columns, rows }) => {
  // create csv exporter
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };
  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    csvExporter.generateCsv(rows);
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={rows}
      enableBottomToolbar
      enableColumnFilterModes
      enableRowVirtualization
      enableRowNumbers
      enableColumnResizing
      enableStickyHeader
      enableFullScreenToggle={false}
      enablePagination={false}
      // enableDensityToggle={false}
      initialState={{ showColumnFilters: true, density: "compact" }}
      muiTopToolbarProps={{
        sx: { backgroundColor: "transparent" },
      }}
      muiTableBodyCellProps={{
        sx: { padding: "0.15rem 0.5rem" },
      }}
      muiBottomToolbarProps={{
        sx: {
          minHeight: "8px",
          height: "8px",
          backgroundColor: "transparent",
        },
      }}
      muiTableContainerProps={{ sx: { maxWidth: "100%", height: "900px" } }}
      muiTableProps={{ sx: { tableLayout: "fixed" } }}
      muiTablePaperProps={{
        sx: { boxShadow: 0, borderRadius: 3, maxWidth: "100%", border: "1px solid #e0e0e0" },
      }}
      renderTopToolbarCustomActions={({ table }) => (
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
          <IconButton onClick={handleExportData}>
            <FileDownloadIcon />
          </IconButton>
        </div>
      )}
      positionGlobalFilter="left"
    />
  );
};

export default Table;
