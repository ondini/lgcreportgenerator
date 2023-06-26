import React from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { getResiduals } from "../utils/dataProcessing";
import Title from "../components/Title";
import "./Histogram.css";

const Histogram = ({ data }) => {
  const residuals = getResiduals(data.LGC_DATA);
  const measTypes = Object.keys(residuals);
  console.log(residuals);
  const plotData = [
    {
      x: [],
      type: "histogram",
      // xbins: {
      //   end: 20,
      //   size: 1,
      //   start: -20,
      // },
      marker: {
        color: "rgba(100, 200, 102, 0.7)",
        line: {
          color: "rgba(100, 200, 102, 1)",
          width: 1,
        },
      },
      nbinsx: 20,
      opacity: 0.75,
    },
  ];

  const createHists = (measType) => {
    let histograms = [];
    Object.keys(residuals[measType]).forEach((key) => {
      if (key === "TGTPOS" || key === "TGTID") return;
      plotData[0].x = residuals[measType][key];
      console.log(residuals[measType][key]);
      histograms.push(
        <div className="histsec-plots-plot">
          <Plot
            data={JSON.parse(JSON.stringify(plotData))} // JSON here is used for deep copy
            layout={{ title: key, bargroupgap: 0.2 }}
          />
        </div>
      );
    });
    return histograms;
  };

  let [histList, setHistList] = useState(createHists(measTypes[0]));

  console.log(histList, setHistList);

  let measTypeButtons = measTypes.map((key) => {
    return (
      <button
        className="histsec-nav-button"
        onClick={() => {
          setHistList(createHists(key));
        }}
      >
        {key}
      </button>
    );
  });

  return (
    <div>
      <Title title="Histograms" />
      <div className="histsec">
        <div className="histsec-nav">
          {" "}
          <h4>Measurement types </h4>
          {measTypeButtons}
        </div>
        <div className="histsec-plots"> {histList} </div>
      </div>
    </div>
  );
};

export default Histogram;
