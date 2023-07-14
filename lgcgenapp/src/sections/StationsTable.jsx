import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { generateNumFormatter } from "../utils/dataProcessing";
import { getSmObsData } from "../utils/allDataProcessing";
import Title from "../components/Title";

export default function StationsTable({ data }) {
  const observations = getSmObsData(data.LGC_DATA);
  console.log(observations);
  const measTypes = Object.keys(observations); // get all the used measurement types from the residuals data
  const measType = "fTSTN";

  let rows = observations[measType].data;
  let columns = observations[measType].columnss;

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
