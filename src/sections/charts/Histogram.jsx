import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { getData } from "../../data_processing/processing";
import Title from "../../components/Title";
import "./Histogram.css";
import Switch from "@mui/material/Switch";
import { noSrcMeasTypes } from "../../data/constants";
import { linkPathPlaceholder } from "../../data/constants";

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
    let src = "INSPOS" in data ? data["INSPOS"][i] + ":" + data["INSLINE"][i] + " -> " : "";
    binsDescs[binIndex] =
      binsDescs[binIndex] +
      (binsCounts[binIndex] < maxBinDescCount
        ? "<br>" + src + data["TGTPOS"][i] + ":" + data["TGTLINE"][i]
        : binsCounts[binIndex] === maxBinDescCount
        ? "<br>  ....  "
        : "");
  }

  let i = 0; // skip empty bins, as it would shift the histogram descriptions
  while (binsCounts[i] === 0) {
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

    hovertemplate: "<b> Count: %{y} </b> %{customdata} <extra></extra>",
  };
};

const makeNormPlotLayout = (residuals) => {
  // function that creates the data object for a histogram, which is then
  // usable by Plotly, possibly as one of many traces in a plot

  return {
    x: residuals,
    type: "histogram",
    autobinx: false,
    name: "RESSIG",
    marker: {
      opacity: 0.75,
      line: {
        width: 1,
      },
    },
    opacity: 0.75,
    hovertemplate: "<b> Count: %{y} </b>",
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

  const filterInstr = noSrcMeasTypes.includes(measType) ? false : filterInstruments; // filter by instrument is not available for some measurement types
  const traces = filterInstr // separate data by instrument if filter is on
    ? separateDataByInstrument(residuals, key, nbinsx)
    : { ";": residuals };

  let plotData = []; // array of data objects for the histogram
  Object.keys(traces).forEach((key2) => {
    plotData.push(makePlotLayout(traces[key2], key, nbinsx, xbins, key2));
  });
  return plotData;
};

const makeNormPlotData = (measTypes, residuals) => {
  let plotData = []; // array of data objects for the histogram
  measTypes.forEach((measType) => {
    if ("residualsData" in residuals[measType]) {
      Object.keys(residuals[measType].residualsData).forEach((key) => {
        if (key.indexOf("RESSIG") !== -1) {
          plotData = plotData.concat(residuals[measType].residualsData[key]);
        }
      });
    }
  });
  return plotData;
};

const handleHistogramClick = (event) => {
  if (event.event.ctrlKey) {
    let firstObs = event.points[0].customdata.split("<br>")[1].split(":");
    const tgtLine = firstObs[firstObs.length === 3 ? 2 : 1];

    window.location.href = `surveypad://link//${linkPathPlaceholder},${tgtLine}`;

    // const link = document.createElement("a");
    // link.href = `surveypad://link//${linkPathPlaceholder},${tgtLine}`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }
};

const Histogram = ({ residuals }) => {
  // Function representing the Histogram section of the app
  // It is a Plotly component with a button menu to select the measurement type and turn off the filter by instrument

  const measTypes = Object.keys(residuals); // get all the used measurement types from the residuals data

  const normalizedResiduals = makeNormPlotData(measTypes, residuals);
  const normLayout = [makeNormPlotLayout(normalizedResiduals)];

  const createHists = (measType, filterInstr) => {
    // function that creates the histogram components for each of the residuals of the selected measurement type
    const nonResKeys = ["TGTPOS", "TGTLINE", "INSPOS", "INSLINE"]; // keys that are not residuals

    let histograms = [];
    if (measType) {
      Object.keys(residuals[measType].residualsData).forEach((key) => {
        if (nonResKeys.includes(key) || key.indexOf("RESSIG") !== -1) return;
        histograms.push(
          <div className="histsec-plots-plot" key={measType + key}>
            <Plot
              data={makePlotData(residuals[measType].residualsData, measType, key, 30, filterInstr)}
              layout={{ title: key, bargroupgap: 0.2, barmode: "stack" }}
              onClick={handleHistogramClick}
            />
          </div>
        );
      });
    }
    return histograms;
  };

  let [filterInstr, setFilterInstr] = useState(true); // state of the filter by instrument
  let [histList, setHistList] = useState(
    // state of the histogram components
    createHists(measTypes[0], filterInstr)
  );
  let [key, setKey] = useState(measTypes[0]); // state of the currently active measurement type

  useEffect(() => {
    // update and re-render the histogram components when the filter or measurement type changes
    setHistList(createHists(key, filterInstr));
  }, [filterInstr, key]);

  let measTypeButtons = measTypes.map((key) => {
    // create the measurement type buttons
    return (
      <button
        key={key}
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
      <Title title="Histograms" id="histograms" />
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
      <Title title="Normalized joint histogram" id="histogramNorm" />
      <div className="histsec-plots">
        <div className="histsec-plots-plot">
          <Plot data={normLayout} layout={{ title: "RES/SIG", bargroupgap: 0.2, barmode: "stack" }} />
        </div>
      </div>
    </div>
  );
};

export default Histogram;
