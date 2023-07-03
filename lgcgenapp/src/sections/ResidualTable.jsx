import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { get3DPointEstData } from "../utils/dataProcessing";
import Title from "../components/Title";

function generateNumFormatter(decimals, factor) {
  // function to generate a function, serving as number formatter for the DataGrid
  return (params) => {
    const roundedValue =
      Math.round(params.value * factor * 10 ** decimals + Number.EPSILON) /
      10 ** decimals;
    return roundedValue;
  };
}

const columns = [
  { field: "id", headerName: "NAME", sortable: true, flex: 1.3 },
  { field: "type", headerName: "TYPE", sortable: true, flex: 0.5 },
  { field: "frame", headerName: "FRAME", sortable: true, flex: 0.4 },
  {
    field: "x",
    headerName: "X",
    sortable: true,
    flex: 1,
    valueFormatter: generateNumFormatter(5, 1),
  },
  {
    field: "y",
    headerName: "Y",
    sortable: true,
    flex: 1,
    valueFormatter: generateNumFormatter(5, 1),
  },
  {
    field: "z",
    headerName: "Z",
    sortable: true,
    flex: 1,
    valueFormatter: generateNumFormatter(5, 1),
  },
];

export default function ResidualTable({ data }) {
  const rows = get3DPointEstData(
    data.LGC_DATA,
    columns.map((col) => col.field)
  );

  return (
    <div style={{ height: "1000px" }}>
      <Title title={"3D Points overview"} />
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
