import { getData } from "../../data_processing/processing";
import { Table, Title } from "../../components";
import { useMemo } from "react";

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

export default function MeasurementsTable({ data, lookupTab3D }) {
  let [rows, columns] = useMemo(() => {
    const measurements = getData(data.LGC_DATA, "STAT", lookupTab3D);
    return mergeMeasTypesData(measurements);
  }, [data.LGC_DATA]);

  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
      <Title title={"Measurement statistics"} id="measurements" />
      <Table
        getRowId={(row) => {
          return Math.floor(Math.random() * 100000000000);
        }}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}
