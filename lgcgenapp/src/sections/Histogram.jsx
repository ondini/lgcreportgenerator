import React from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { getResiduals } from "../utils/dataProcessing";
import Title from "../components/Title";
import "./Histogram.css";

const makeBinDescs = (data, key, nbinsx, binsx) => {
  let binsDescs = Array(nbinsx).fill("");
  let binsCounts = Array(nbinsx).fill(0);
  const maxBinDescCount = 20;

  for (let i = 0; i < data[key].length; i++) {
    const value = data[key][i];
    const binIndex = Math.floor((value - binsx.start) / binsx.size);
    binsCounts[binIndex] += 1;
    binsDescs[binIndex] =
      binsDescs[binIndex] +
      (binsCounts[binIndex] < maxBinDescCount
        ? "<br>" +
          data["INSPOS"][i] +
          ":" +
          data["INSLINE"][i] +
          " -> " +
          data["TGTPOS"][i] +
          ":" +
          data["TGTLINE"][i]
        : binsCounts[binIndex] == maxBinDescCount
        ? "<br>  ....  "
        : "");
  }

  let i = 0;
  while (binsCounts[i] == 0) {
    i++;
  }

  return { xbins: binsx, customdata: binsDescs.slice(i) };
};

const makeTraces = (residuals, key, nbinsx) => {
  let traces = {};
  let traceTemp = {};
  Object.keys(residuals).forEach((key) => {
    traceTemp[key] = [];
  });
  for (let i = 0; i < residuals[key].length; i++) {
    const traceKey = residuals["INSPOS"][i] + ":" + residuals["INSLINE"][i];
    if (traces[traceKey] === undefined) {
      traces[traceKey] = JSON.parse(JSON.stringify(traceTemp));
    }
    Object.keys(residuals).forEach((key2) => {
      traces[traceKey][key2].push(residuals[key2][i]);
    });
  }
  return traces;
};

const makePlotLayout = (residuals, key, nbinsx, binsx, name) => {
  let resBinData = makeBinDescs(residuals, key, nbinsx, binsx);

  return {
    x: residuals[key],
    customdata: resBinData.customdata, // customdata is used to display the obs. information in the hovertemplate
    type: "histogram",
    autobinx: false,
    xbins: resBinData.xbins,
    name: name,
    marker: {
      // color: "rgba(100, 200, 102, 0.7)",
      line: {
        // color: "rgba(100, 200, 102, 1)",
        width: 1,
      },
    },
    opacity: 0.75,

    hovertemplate: "<b> Count: %{y} </b>" + "%{customdata} <extra></extra>",
  };
};

const makePlotData = (residuals, key, nbinsx) => {
  const maxVal = Math.max(...residuals[key]);
  const minVal = Math.min(...residuals[key]);
  const binSize = (maxVal - minVal) / nbinsx;
  let xbins = {
    end: maxVal,
    size: binSize,
    start: minVal,
  };

  let mkTrcs = true;
  const traces = mkTrcs
    ? makeTraces(residuals, key, nbinsx)
    : { ";": residuals };
  let plotData = [];
  Object.keys(traces).forEach((key2) => {
    plotData.push(makePlotLayout(traces[key2], key, nbinsx, xbins, key2));
  });
  return plotData;
};

const Histogram = ({ data }) => {
  const residuals = getResiduals(data.LGC_DATA);
  const measTypes = Object.keys(residuals);

  const createHists = (measType) => {
    const nonResKeys = ["TGTPOS", "TGTLINE", "INSPOS", "INSLINE"];
    let histograms = [];
    Object.keys(residuals[measType]).forEach((key) => {
      if (nonResKeys.includes(key)) return;

      console.log(makePlotData(residuals[measType], key, 30));
      histograms.push(
        <div className="histsec-plots-plot">
          <Plot
            data={makePlotData(residuals[measType], key, 30)}
            layout={{ title: key, bargroupgap: 0.2, barmode: "stack" }}
          />
        </div>
      );
    });
    return histograms;
  };

  let [histList, setHistList] = useState(createHists(measTypes[0]));

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
