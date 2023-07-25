import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getData } from "../../data_processing/processing";
import Title from "../../components/Title";

export default function StationsTable({ data }) {
  const observations = getData(data.LGC_DATA, "STAT");
  const measTypes = Object.keys(observations); // get all the used measurement types from the residuals data
  const measType = measTypes.includes("fTSTN") ? "fTSTN" : "fOBSXYZ";

  let rows = observations[measType].data;
  let columns = observations[measType].columnDetails;

  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
      <Title title={"Instrument positions overview"} />
      <DataGrid
        getRowId={(row) => {
          return Math.floor(Math.random() * 100000000000);
        }}
        rows={rows}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
