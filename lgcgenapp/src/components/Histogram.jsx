import React from "react";
import Plot from "react-plotly.js";
import { getResiduals } from "../utils/dataProcessing";

const Histogram = ({ data }) => {
  console.log("im in");
  const residuals = getResiduals(data.LGC_DATA);
  console.log(residuals);
  const types = Object.keys(residuals);
  console.log(residuals["DIST"]);
  const plotData = [
    {
      x: residuals["ANGL"],
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

  return (
    <div>
      <Plot data={plotData} layout={{ title: types[0], bargroupgap: 0.2 }} />
    </div>
  );
};

export default Histogram;
