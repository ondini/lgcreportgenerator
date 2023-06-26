import "react-data-grid/lib/styles.css";

import DataGrid from "react-data-grid";
import { get3DPointEstDataRows } from "../utils/dataProcessing";
import { useState, useCallback, useMemo } from "react";

function RoundedNumberFormatter({ value }) {
  const roundedValue = Math.round(value * 10000 + Number.EPSILON) / 10000; // Round to 6 decimal places
  return <span>{roundedValue}</span>;
}

function RoundedNumberFormatterC({ value }) {
  const roundedValue = Math.round(value * 10000000 + Number.EPSILON) / 10000; // Round to 6 decimal places
  return <span>{roundedValue}</span>;
}

const columnsP = [
  { key: "name", name: "NAME", sortable: true, resizable: true },
  { key: "type", name: "TYPE", sortable: true, resizable: true },
  {
    key: "x",
    name: "X",
    sortable: true,
    resizable: true,
    formmatter: RoundedNumberFormatter,
  },
  {
    key: "y",
    name: "Y",
    sortable: true,
    resizable: true,
    formatter: RoundedNumberFormatter,
  },
  {
    key: "z",
    name: "Z",
    sortable: true,
    resizable: true,
    formatter: RoundedNumberFormatter,
  },
  { key: "sx", name: "SX", sortable: true, resizable: true },
  { key: "sy", name: "SY", sortable: true, resizable: true },
  { key: "sz", name: "SZ", sortable: true, resizable: true },
  { key: "dx", name: "DX", sortable: true, resizable: true },
  { key: "dy", name: "DY", sortable: true, resizable: true },
  { key: "dz", name: "DZ", sortable: true, resizable: true },
];

const DataTableRG = ({ data, direction }) => {
  const rowsP = get3DPointEstDataRows(
    data.LGC_DATA,
    columnsP.map((col) => col.key)
  );

  const [rows] = useState(rowsP);
  const [columns, setColumns] = useState(columnsP);
  const [sortColumns, setSortColumns] = useState([]);
  const onSortColumnsChange = useCallback((sortColumns) => {
    setSortColumns(sortColumns.slice(-1));
  }, []);

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return rows;
    const { columnKey, direction } = sortColumns[0];

    let sortedRows = [...rows];

    switch (columnKey) {
      case "task":
      case "priority":
      case "issueType":
        sortedRows = sortedRows.sort((a, b) =>
          a[columnKey].localeCompare(b[columnKey])
        );
        break;
      case "complete":
        sortedRows = sortedRows.sort((a, b) => a[columnKey] - b[columnKey]);
        break;
      default:
    }
    return direction === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [rows, sortColumns]);

  return (
    <DataGrid
      columns={columns}
      rows={sortedRows}
      sortColumns={sortColumns}
      onSortColumnsChange={onSortColumnsChange}
      direction={direction}
      defaultColumnOptions={{ width: "1fr" }}
      className="rdg-light"
    />
  );
};

export default DataTableRG;
