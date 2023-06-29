import React from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { getResiduals } from "../utils/dataProcessing";
import Title from "../components/Title";
import "./Histogram.css";

const makeBins = (data, key, nbinsx) => {
  console.log("getting boins");
  const maxVal = Math.max(...data[key]);
  const minVal = Math.min(...data[key]);
  const binSize = (maxVal - minVal) / nbinsx;
  console.log(maxVal, minVal, binSize);
  let xbins = {
    end: maxVal,
    size: binSize,
    start: minVal,
  };

  let bins = Array(nbinsx).fill("");

  for (let i = 0; i < data[key].length; i++) {
    const value = data[key][i];
    const binIndex = Math.floor((value - minVal) / binSize);
    bins[binIndex] =
      bins[binIndex] +
      "<br>" +
      data["INSPOS"][i] +
      ":" +
      data["INSLINE"][i] +
      " -> " +
      data["TGTPOS"][i] +
      ":" +
      data["TGTLINE"][i];
  }

  console.log(bins);
  return { xbins: xbins, customdata: bins };
};

const Histogram = ({ data }) => {
  const residuals = getResiduals(data.LGC_DATA);
  const measTypes = Object.keys(residuals);
  console.log(residuals);
  const plotData = [
    {
      x: [],
      customdata: [],
      y: [],
      type: "histogram",
      autobinx: false,
      marker: {
        color: "rgba(100, 200, 102, 0.7)",
        line: {
          color: "rgba(100, 200, 102, 1)",
          width: 1,
        },
      },
      text: [],
      hovertemplate: "Count: %{y}" + "%{customdata} <extra></extra>",
      nbinsx: 30,
      opacity: 0.75,
      xbins: {},
    },
  ];

  const createHists = (measType) => {
    const nonResKeys = ["TGTPOS", "TGTLINE", "INSPOS", "INSLINE"];
    let histograms = [];
    Object.keys(residuals[measType]).forEach((key) => {
      if (nonResKeys.includes(key)) return;
      let resBinData = makeBins(residuals[measType], key, 30);
      plotData[0].x = residuals[measType][key];
      plotData[0].xbins = resBinData.xbins;
      plotData[0].customdata = resBinData.customdata;
      plotData[0].y = residuals[measType]["TGTPOS"];
      //plotData[0].customdata = residuals[measType]["TGTLINE"];
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
