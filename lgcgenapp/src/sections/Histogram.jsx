import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { getResiduals } from "../utils/dataProcessing";
import Title from "../components/Title";
import "./Histogram.css";
import Switch from "@mui/material/Switch";

const makeBinDescs = (data, key, nbinsx, binsx) => {
  // function that creates descriptions for each bin
  // the description is a string with the instrument position and line number,
  // followed by the target position and line number of each observation in the bin

  let binsDescs = Array(nbinsx).fill(""); // array of description strings, one for each bin
  let binsCounts = Array(nbinsx).fill(0); // array of counts, one for each bin (just to count and then limit lines)
  const maxBinDescCount = 20; // maximum number of lines in the description string

  for (let i = 0; i < data[key].length; i++) {
    // loop over all observations
    const value = data[key][i];
    const binIndex = Math.floor((value - binsx.start) / binsx.size); // index of the bin where the observation belongs

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

  let i = 0; // skip empty bins, as it would shift the histogram descriptions
  while (binsCounts[i] == 0) {
    i++;
  }

  return binsDescs.slice(i);
};

const separateDataByInstrument = (residuals, key) => {
  // function that separates the residuals data by instrument, so that they are filterable in histograms

  let instruments = {}; // object with the data separated by instrument
  let instruInit = {}; // template to initialize each instrument object
  Object.keys(residuals).forEach((key) => {
    instruInit[key] = [];
  });

  for (let i = 0; i < residuals[key].length; i++) {
    // loop over all observations
    const traceKey = residuals["INSPOS"][i] + ":" + residuals["INSLINE"][i]; // unique key for each instrument
    if (instruments[traceKey] === undefined) {
      instruments[traceKey] = JSON.parse(JSON.stringify(instruInit));
    }
    Object.keys(residuals).forEach((key2) => {
      instruments[traceKey][key2].push(residuals[key2][i]); // add the observation to the instrument object
    });
  }
  return instruments;
};

const makePlotLayout = (residuals, key, nbinsx, binsx, name) => {
  // function that creates the data object for a histogram, which is then
  // usable by Plotly, possibly as one of many traces in a plot

  let resBinData = makeBinDescs(residuals, key, nbinsx, binsx);

  return {
    x: residuals[key],
    customdata: resBinData, // customdata is used to display the obs. information in the hovertemplate
    type: "histogram",
    autobinx: false,
    xbins: binsx,
    name: name,
    marker: {
      opacity: 0.75,
      line: {
        width: 1,
      },
    },
    opacity: 0.75,

    hovertemplate: "<b> Count: %{y} </b>" + "%{customdata} <extra></extra>",
  };
};

const makePlotData = (residuals, measType, key, nbinsx, filterInstruments) => {
  // function that creates array of data objects for a histogram, which is then
  // directly passed to a Plotly component

  // craete bins(the same for all instrument positions, so that they are stackable)
  const maxVal = Math.max(...residuals[key]);
  const minVal = Math.min(...residuals[key]);
  const binSize = (maxVal - minVal) / nbinsx;
  let xbins = {
    end: maxVal,
    size: binSize,
    start: minVal,
  };

  const traces = filterInstruments // separate data by instrument if filter is on
    ? separateDataByInstrument(residuals, key, nbinsx)
    : { ";": residuals };

  let plotData = []; // array of data objects for the histogram
  Object.keys(traces).forEach((key2) => {
    plotData.push(makePlotLayout(traces[key2], key, nbinsx, xbins, key2));
  });
  return plotData;
};

const Histogram = ({ data }) => {
  // Function representing the Histogram section of the app
  // It is a Plotly component with a button menu to select the measurement type and turn off the filter by instrument

  const residuals = getResiduals(data.LGC_DATA); // get the residuals data from the LGC_DATA object
  const measTypes = Object.keys(residuals); // get all the used measurement types from the residuals data

  const createHists = (measType, filterInstr) => {
    // function that creates the histogram components for each of the residuals of the selected measurement type
    const nonResKeys = ["TGTPOS", "TGTLINE", "INSPOS", "INSLINE"]; // keys that are not residuals

    let histograms = [];
    Object.keys(residuals[measType]).forEach((key) => {
      if (nonResKeys.includes(key)) return;
      histograms.push(
        <div className="histsec-plots-plot">
          <Plot
            data={makePlotData(
              residuals[measType],
              measType,
              key,
              30,
              filterInstr
            )}
            layout={{ title: key, bargroupgap: 0.2, barmode: "stack" }}
          />
        </div>
      );
    });
    return histograms;
  };

  let [filterInstr, setFilterInstr] = useState(true); // state of the filter by instrument
  let [histList, setHistList] = useState(
    // state of the histogram components
    createHists(measTypes[0], filterInstr)
  );
  let [key, setKey] = useState(measTypes[0]); // state of the currently active measurement type

  useEffect(() => {
    setHistList(createHists(key, filterInstr));
  }, [filterInstr, key]);

  let measTypeButtons = measTypes.map((key) => {
    return (
      <button
        className="histsec-nav-button"
        onClick={() => {
          setKey(key);
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
          <h4>Measurement type </h4>
          {measTypeButtons}
          <h4>Filter by instrument</h4>
          <Switch
            onChange={(event) => {
              setFilterInstr(event.target.checked);
            }}
            checked={filterInstr}
          />
        </div>
        <div className="histsec-plots"> {histList} </div>
      </div>
    </div>
  );
};

export default Histogram;
