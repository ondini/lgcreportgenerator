import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getFrames } from "../../data_processing/processing";
import Title from "../../components/Title";

export default function FrameTable({ frameData }) {
  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
      <Title title="Frame overview" id="frames" />
      <DataGrid
        getRowId={(row) => {
          return row.NAME;
        }}
        rows={frameData.data}
        columns={frameData.columnDetails}
        hideFooter
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
