import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getFrames } from "../../data_processing/allDataProcessing";
import Title from "../../components/Title";

export default function FrameTable({ data }) {
  const observations = getFrames(data.LGC_DATA);

  let rows = observations.data;
  let columns = observations.columnss;

  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
      <Title title={"Frame overview"} />
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
