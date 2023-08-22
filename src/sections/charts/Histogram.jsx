import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { Title } from "../../components";
import "./Histogram.css";
import { Switch, TextField, Button } from "@mui/material";
import { noSrcMeasTypes } from "../../data/constants";
import { linkPathPlaceholder } from "../../data/constants";

const makeBinDescs = (data, key, nbinsx, binsx) => {
  // function that creates descriptions for each bin
  // the description is a string with the instrument position and line number (if there is some)
  // followed by the target position and line number of each observation in the bin

  let binsDescs = Array(nbinsx).fill(""); // array of description strings, one for each bin
  let binsCounts = Array(nbinsx).fill(0); // array of counts, one for each bin (just to count and then limit lines)
  const maxBinDescCount = 20; // maximum number of lines in the description string

  for (let i = 0; i < data[key].length; i++) {
    // loop over all observations
    const value = data[key][i];
    if (value !== undefined) {
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
  }

  let i = 0; // skip empty bins, as it would shift the histogram descriptions
  while (binsCounts[i] === 0) {
    i++;
  }
  return binsDescs.slice(i);
};

const makeBinDescsNorm = (data, key, nbinsx, binsx) => {
  // function that creates descriptions for each bin
  // the description is a string with the type followed by the
  // target position and line number of each observation in the bin

  let binsDescs = Array(nbinsx).fill(""); // array of description strings, one for each bin
  let binsCounts = Array(nbinsx).fill(0); // array of counts, one for each bin (just to count and then limit lines)
  const maxBinDescCount = 20; // maximum number of lines in the description string

  for (let i = 0; i < data[key].length; i++) {
    // loop over all observations
    const value = data[key][i];
    if (value !== undefined) {
      const binIndex = Math.floor((value - binsx.start) / binsx.size); // index of the bin where the observation belongs

      binsCounts[binIndex] += 1;
      binsDescs[binIndex] =
        binsDescs[binIndex] +
        (binsCounts[binIndex] < maxBinDescCount
          ? "<br>" + data["TYPE"][i] + "::" + data["TGTPOS"][i] + ":" + data["TGTLINE"][i]
          : binsCounts[binIndex] === maxBinDescCount
          ? "<br>  ....  "
          : "");
    }
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

const makePlotLayout = (residuals, resBinData, binsx, name) => {
  // function that creates the data object for a histogram, which is then
  // usable by Plotly, possibly as one of many traces in a plot

  return {
    x: residuals,
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

const createCleanBins = (residuals, nbinsx) => {
  // make bins and filter undefined
  const replacementValue = 0;
  // craete bins(the same for all instrument positions, so that they are stackable)
  const cleanRes = residuals.map((value) => (value === undefined || isNaN(value) ? replacementValue : value));
  const maxVal = Math.max(...cleanRes) * 1.01;
  const minVal = Math.min(...cleanRes);
  const binSize = (maxVal - minVal) / nbinsx;
  let xbins = {
    end: maxVal,
    size: binSize,
    start: minVal,
  };

  return [xbins, cleanRes];
};

const makePlotData = (residuals, measType, key, nbinsx, filterInstruments) => {
  // function that creates array of data objects for a histogram, which is then
  // directly passed to a Plotly component
  const [xbins, _] = createCleanBins(residuals[key], nbinsx);
  const filterInstr = noSrcMeasTypes.includes(measType) ? false : filterInstruments; // filter by instrument is not available for some measurement types
  const traces = filterInstr // separate data by instrument if filter is on
    ? separateDataByInstrument(residuals, key, nbinsx)
    : { ";": residuals };

  let plotData = []; // array of data objects for the histogram
  Object.keys(traces).forEach((key2) => {
    let resBinData = makeBinDescs(traces[key2], key, nbinsx, xbins);
    plotData.push(makePlotLayout(traces[key2][key], resBinData, xbins, key2));
  });
  return plotData;
};

const makeNormPlotData = (measTypes, residuals, nbinsx) => {
  // function that creates array of data objects for a histogram, which is then
  // directly passed to a Plotly component
  let plotData = {
    RESSIG: [],
    TGTLINE: [],
    TGTPOS: [],
    TYPE: [],
  }; // array of data arrays for normalized histogram

  measTypes.forEach((measType) => {
    if ("residualsData" in residuals[measType]) {
      Object.keys(residuals[measType].residualsData).forEach((key) => {
        if (key.indexOf("RESSIG") !== -1) {
          plotData["RESSIG"] = plotData.RESSIG.concat(residuals[measType].residualsData[key]);
          plotData["TGTLINE"] = plotData.TGTLINE.concat(residuals[measType].residualsData["TGTLINE"]);
          plotData["TGTPOS"] = plotData.TGTPOS.concat(residuals[measType].residualsData["TGTPOS"]);
          plotData["TYPE"] = plotData.TYPE.concat(Array(residuals[measType].residualsData[key].length).fill(measType));
        }
      });
    }
  });

  const [xbins, cleanRes] = createCleanBins(plotData.RESSIG, nbinsx);
  let resBinData = makeBinDescsNorm(plotData, "RESSIG", nbinsx, xbins);
  return [makePlotLayout(cleanRes, resBinData, xbins, "RESSIG")];
};

const handleHistogramClick = (event) => {
  if (event.event.ctrlKey) {
    let firstObs = event.points[0].customdata.split("<br>")[1].split(":");
    const tgtLine = firstObs.slice(-1); // last element is tgt line

    window.location.href = `surveypad://link//${linkPathPlaceholder},${tgtLine}`;
  }
};

const Histogram = ({ residuals }) => {
  // Function representing the Histogram section of the app
  // It is a Plotly component with a button menu to select the measurement type and turn off the filter by instrument

  const measTypes = Object.keys(residuals); // get all the used measurement types from the residuals data

  const createHists = (measType, filterInstr, nbinsx) => {
    // function that creates the histogram components for each of the residuals of the selected measurement type
    const nonResKeys = ["TGTPOS", "TGTLINE", "INSPOS", "INSLINE"]; // keys that are not residuals

    let histograms = [];
    if (measType) {
      Object.keys(residuals[measType].residualsData).forEach((key) => {
        if (nonResKeys.includes(key) || key.indexOf("RESSIG") !== -1 || key.indexOf("ABS") !== -1) return;
        //const units = residuals[measType].columnDetails.find((obj) => obj.field === key).units;
        histograms.push(
          <div className="histsec-plots-plot" key={measType + key}>
            <Plot
              data={makePlotData(residuals[measType].residualsData, measType, key, nbinsx, filterInstr)}
              layout={{ title: key, bargroupgap: 0.2, barmode: "stack" }}
              onClick={handleHistogramClick}
            />
          </div>
        );
      });
    }
    return histograms;
  };

  const createNormHist = (measTypes, residuals, nBins) => {
    const normLayout = makeNormPlotData(measTypes, residuals, nBins);
    return (
      <Plot
        data={normLayout}
        layout={{ title: "RES/SIG (-)", bargroupgap: 0.2, barmode: "stack" }}
        onClick={handleHistogramClick}
      />
    );
  };

  let [filterInstr, setFilterInstr] = useState(true); // state of the filter by instrument
  let [nBins, setNBins] = useState(30); // state of the number of bins
  let [histList, setHistList] = useState(createHists(measTypes[0], filterInstr, nBins)); // state of the histogram components
  let [normHist, setNormHist] = useState(createNormHist(measTypes, residuals, nBins));
  let [key, setKey] = useState(measTypes[0]); // state of the currently active measurement type
  let [nBinsInput, setNBinsInput] = useState(nBins); // state of the number of bins input

  useEffect(() => {
    // update and re-render the histogram components when the filter measurement type, or nBins changes
    setHistList(createHists(key, filterInstr, nBins));
  }, [filterInstr, key, nBins]);
  useEffect(() => {
    // update and re-render nromalized histogram components when nBins changes
    setNormHist(createNormHist(measTypes, residuals, nBins));
  }, [nBins]);

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
        {/* slice to remove the first character which is f in e.g.'fTSTN' */}
        {key.slice(1)}
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
          <h4>Number of bins</h4>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(v) => {
              setNBinsInput(Number(v.target.value));
            }}
            margin="normal"
            defaultValue={nBins}
            sx={{ marginLeft: "1rem", minWidth: "100px" }}
          />
          <Button
            variant="contained"
            disableElevation
            sx={{ marginLeft: "1rem" }}
            onClick={() => {
              setNBinsInput(nBinsInput < 1 ? 1 : nBinsInput > 200 ? 200 : nBinsInput);
              setNBins(Number(nBinsInput));
            }}
          >
            Submit
          </Button>
        </div>
        <div className="histsec-plots"> {histList} </div>
      </div>
      <Title title="Normalized joint histogram" id="histogramNorm" />
      <div className="histsec-plots">
        <div className="histsec-plots-plot">{normHist}</div>
      </div>
    </div>
  );
};

export default Histogram;
