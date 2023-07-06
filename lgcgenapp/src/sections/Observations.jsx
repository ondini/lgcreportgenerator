import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getObsData } from "../utils/allDataProcessing";
import { generateNumFormatter } from "../utils/dataProcessing";
import Title from "../components/Title";

export default function Observations({ data }) {
  const rows = getObsData(data.LGC_DATA).fTSTN;
  console.log(rows);

  return (
    <div style={{ marginTop: "5rem" }}>
      <Title title={"Observations overview"} />
      <DataGrid
        rows={rows.data}
        columns={rows.columnss}
        hideFooter
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
