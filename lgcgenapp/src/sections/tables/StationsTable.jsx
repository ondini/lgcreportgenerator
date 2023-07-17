import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getSmObsData } from "../../utils/allDataProcessing";
import Title from "../../components/Title";

export default function StationsTable({ data }) {
  const observations = getSmObsData(data.LGC_DATA);
  const measTypes = Object.keys(observations); // get all the used measurement types from the residuals data
  const measType = measTypes.includes("fTSTN") ? "fTSTN" : "fOBSXYZ";

  let rows = observations[measType].data;
  let columns = observations[measType].columnss;

  return (
    <div style={{  height: '900px', marginBottom: "4rem"  }}>
      <Title title={"Instrument positions overview"} />
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
