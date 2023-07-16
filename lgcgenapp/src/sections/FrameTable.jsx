import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { generateNumFormatter } from "../utils/dataProcessing";
import { getFrames } from "../utils/allDataProcessing";
import Title from "../components/Title";

export default function FrameTable({ data }) {
  const observations = getFrames(data.LGC_DATA);

  let rows = observations.data;
  let columns = observations.columnss;

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
