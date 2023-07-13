import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { generateNumFormatter } from "../utils/dataProcessing";
import Title from "../components/Title";

export default function DataTable({ data }) {
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
