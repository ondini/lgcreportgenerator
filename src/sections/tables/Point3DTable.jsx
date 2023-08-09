import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { get3DPointEstData } from "../../data_processing/processing";
import Title from "../../components/Title";

export default function Point3DTable({ data }) {
  const pointsData = get3DPointEstData(data.LGC_DATA);

  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
      <Title title="3D Points overview" id="tablePt3D" />
      <DataGrid
        rows={pointsData.data}
        columns={pointsData.columnDetails}
        hideFooter
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
