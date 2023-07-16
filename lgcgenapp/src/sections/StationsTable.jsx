import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { generateNumFormatter } from "../utils/dataProcessing";
import { getSmObsData } from "../utils/allDataProcessing";
import Title from "../components/Title";

export default function StationsTable({ data }) {
  const observations = getSmObsData(data.LGC_DATA);
  const measTypes = Object.keys(observations); // get all the used measurement types from the residuals data
  console.log(measTypes, measTypes.includes("fTSTN"));
  const measType = measTypes.includes("fTSTN") ? "fTSTN" : "fOBSXYZ";

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
