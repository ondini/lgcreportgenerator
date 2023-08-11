import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getData } from "../../data_processing/processing";
import Title from "../../components/Title";

const mergeMeasTypesData = (data) => {
  if (Object.keys(data).length === 0) {
    return [[], []];
  }
  let mergedData = [];
  Object.keys(data).forEach((measType) => {
    mergedData = mergedData.concat(data[measType].data);
  });
  return [mergedData, data[Object.keys(data)[0]].columnDetails];
};

export default function MeasurementsTable({ data }) {
  const observations = getData(data.LGC_DATA, "STAT");
  let [rows, columns] = mergeMeasTypesData(observations);

  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
      <Title title={"Measurement statistics"} id="measurements" />
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
