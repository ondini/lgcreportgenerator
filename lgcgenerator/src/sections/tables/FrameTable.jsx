import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getFrames } from "../../data_processing/processing";
import Title from "../../components/Title";

export default function FrameTable({ data }) {
  const observations = getFrames(data.LGC_DATA);

  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
      <Title title={"Frame overview"} />
      <DataGrid
        getRowId={(row) => {
          return row.NAME;
        }}
        rows={observations.data}
        columns={observations.columnDetails}
        hideFooter
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
