import React from "react";
import Plot from "react-plotly.js";
import { getResiduals } from "../utils/dataProcessing";

const Histogram = ({ data }) => {
  const residuals = getResiduals(data.LGC_DATA);
  const measTypes = Object.keys(residuals);

  const plotData = [
    {
      x: [],
      type: "histogram",
      xbins: {
        end: 20,
        size: 1,
        start: -20,
      },
      marker: {
        color: "rgba(100, 200, 102, 0.7)",
        line: {
          color: "rgba(100, 200, 102, 1)",
          width: 1,
        },
      },
      opacity: 0.75,
    },
  ];

  let measType = measTypes[1];
  let histList = [];

  Object.keys(residuals[measType]).forEach((key) => {
    if (key === "TGTPOS" || key === "TGTID") return;
    plotData[0].x = residuals[measType][key];
    console.log(residuals[measType][key]);
    histList.push(
      <Plot
        data={JSON.parse(JSON.stringify(plotData))} // JSON here is used for deep copy
        layout={{ title: key, bargroupgap: 0.2 }}
      />
    );
  });

  let keyee = Object.keys(residuals[measType])[1];

  return <div>{histList}</div>;
};

export default Histogram;
