import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { get3DPointEstData, generateNumFormatter } from "../../data_processing/dataProcessing";
import Title from "../../components/Title";

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
  {
    field: "h",
    headerName: "H",
    sortable: true,
    flex: 1,
    valueFormatter: generateNumFormatter(5, 1),
  },
  {
    field: "sx",
    headerName: "SX",
    sortable: true,
    flex: 0.4,
    valueFormatter: generateNumFormatter(2, 1000),
  },
  {
    field: "sy",
    headerName: "SY",
    sortable: true,
    flex: 0.4,
    valueFormatter: generateNumFormatter(2, 1000),
  },
  {
    field: "sz",
    headerName: "SZ",
    sortable: true,
    flex: 0.4,
    valueFormatter: generateNumFormatter(2, 1000),
  },
  {
    field: "dx",
    headerName: "DX",
    sortable: true,
    flex: 0.4,
    valueFormatter: generateNumFormatter(2, 1000),
  },
  {
    field: "dy",
    headerName: "DY",
    sortable: true,
    flex: 0.4,
    valueFormatter: generateNumFormatter(2, 1000),
  },
  {
    field: "dz",
    headerName: "DZ",
    sortable: true,
    flex: 0.4,
    valueFormatter: generateNumFormatter(2, 1000),
  },
];

export default function Point3DTable({ data }) {
  const rows = get3DPointEstData(
    data.LGC_DATA,
    columns.map((col) => col.field)
  );

  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
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
