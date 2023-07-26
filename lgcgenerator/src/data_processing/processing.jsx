import {
  generateTSTNObsCols,
  generateECHOObsCols,
  generateOBSXYZObsCols,
  generateStationsCols,
  generateFrameCols,
} from "../data/columnsData";
import { measurementTypes, pointTypes } from "../data/constants";

// ================== DESCRIPTION ================== //
// This file contains functions that are used to process data from LGC_DATA
// the paths to the data are specified in the columns files
// ================================================== //

// ================================================= //
// ============== UTILITY FUNCTIONS ================ //
// ================================================= //

const getFromDict = (data, path, iteratorVals, unitConv) => {
  // function used to get data from neseted dictionaries using path where each key is separated by "/"
  // if key is "i" then it is replaced by value from iterator array
  // if "!" is present in path, then the paths are interpreted as values to be used in expression resulting after splitting on ! and replacing the paths

  if (path.startsWith("!")) {
    // expression evaluation part
    let exprArr = path.split("!");
    let expr = exprArr.reduce((acc, curr) => {
      if (["", "+", "-", "*", "/"].includes(curr)) {
        return acc + curr;
      } else {
        let val = getFromDict(data, curr, iteratorVals, unitConv);
        return acc + (typeof val === "number" && val < 0 ? "(" + val + ")" : val);
      }
    }, "");
    return eval(expr);
  } else {
    // gettin data from path
    let pathArr = path.split("/");
    let res = data;
    let itIndex = 0;
    pathArr.forEach((key) => {
      if (key === "i") {
        key = iteratorVals[itIndex++];
      } else if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key)) {
        key = parseInt(key);
      }
      res = res[key];
    });
    return unitConv(res);
  }
};

const makeGridData = (cols, data) => {
  // this function prepars data to be processed by dataGrid

  // get column details for columns that are to be shown and prepare for grid
  let colNames = Object.keys(cols);
  let columnDetails = [];
  for (let i = 0; i < colNames.length; i++) {
    if (cols[colNames[i]].show) {
      columnDetails.push(cols[colNames[i]]);
    }
  }

  // convert array of values to dictionary with keys from colNames, so thtat this can be used as rows in grid
  let rowData = data[colNames[0]].map((value, index) => {
    return colNames.reduce((acc, key) => {
      acc[key] = data[key][index];
      return acc;
    }, {});
  });

  return { data: rowData, columnDetails: columnDetails };
};

const mergeRowsData = (measType, acc, obsData) => {
  if (!(measType in acc)) {
    acc[measType] = obsData;
  } else {
    acc[measType].data = acc[measType].data.concat(obsData.data);
  }
  return acc;
};

const generateColsData = (cols) => {
  let columns = {};
  Object.keys(cols).forEach((key) => {
    columns[key] = [];
  });
  return columns;
};

// ================================================= //
// ============ DATA SERVING FUNCTIONS ============= //
// ================================================= //

// --- MEASUREMENT TYPE SELECTORS FOR VARIOUS TABLES --- //
const obsTypeSelector = (measurement, type) => {
  switch (type) {
    case "fECHO":
      return getECHOObsRows(measurement);
    case "fTSTN":
      return getTSTNObsRows(measurement);
    case "fOBSXYZ":
      return getOBSXYZRows(measurement);
    case "fECWS":
    case "fEDM":
    case "fRADI":
    default:
      return {};
  }
};

const statTypeSelector = (measurement, type) => {
  switch (type) {
    case "fTSTN":
      return getTSTNStationRows(measurement);
    case "fOBSXYZ":
      return getOBSXYZStationRows(measurement);
    case "fECHO":
    case "fECWS":
    case "fEDM":
    case "fRADI":
    default:
      return {};
  }
};

// --- FUNCTION SELECTING CORRECT ROW GETTER BASED ON TABLE TYPE --- //
const dataTypeSelector = (type) => {
  switch (type) {
    case "OBS":
      return obsTypeSelector;
    case "STAT":
      return statTypeSelector;
    default:
      return () => {};
  }
};

// --- MAIN FUNCTION FOR DATA SERVING --- //
export const getData = (data, dataType) => {
  return data.tree.reduce((acc, curr) => {
    // reduce over all frames
    Object.keys(curr.measurements).forEach((measType) => {
      // get measurement data for each measurement type
      if (measurementTypes.includes(measType)) {
        // this filters measurement types from other attributess
        let obsData = dataTypeSelector(dataType)(curr.measurements, measType);
        acc = mergeRowsData(measType, acc, obsData);
      }
    });
    return acc;
  }, {});
};

// ================================================= //
// ============== POINT ESTIMATION ================= //
// ================================================= //

const getTSTNStationRows = (measurement) => {
  let cols = generateStationsCols();
  let columns = generateColsData(cols);

  let obsData = measurement.fTSTN.reduce((acc, curr) => {
    // reduce over all measurements
    [
      ["ANGL", "anglObsSum"],
      ["ZEND", "zendObsSum"],
      ["DIST", "distObsSum"],
    ].forEach(([key, path]) => {
      for (let i = 0; i < curr.roms.length; i++) {
        let rom = curr.roms[i]; // current rom
        if ("measPLR3D" in rom) {
          acc["TYPE"].push("PLR3D:" + key);
          acc["STN_POS"].push(rom.plr3dSummary_[path].fObsText);
          acc["STN_LINE"].push(curr.line);
          acc["RES_MAX"].push(rom.plr3dSummary_[path].fResMax);
          acc["RES_MIN"].push(rom.plr3dSummary_[path].fResMin);
          acc["RES_AVG"].push(rom.plr3dSummary_[path].fMean);
          acc["ECART_TYPE"].push(rom.plr3dSummary_[path].fStdev);
        }
      }
    });
    return acc;
  }, columns);

  return makeGridData(cols, obsData);
};

const getOBSXYZStationRows = (measurement) => {
  let cols = generateStationsCols();
  let columns = generateColsData(cols);

  [
    ["X", "obsXObsSum"],
    ["Y", "obsYObsSum"],
    ["Z", "obsZObsSum"],
  ].forEach(([key, path]) => {
    columns["TYPE"].push("OBSXYZ:" + key);
    columns["STN_POS"].push(measurement.obsxyzSummary_[path].fObsText);
    columns["STN_LINE"].push(measurement.obsxyzSummary_[path].fNumberOfObs); /// NOT LINE!!
    columns["RES_MAX"].push(measurement.obsxyzSummary_[path].fResMax);
    columns["RES_MIN"].push(measurement.obsxyzSummary_[path].fResMin);
    columns["RES_AVG"].push(measurement.obsxyzSummary_[path].fMean);
    columns["ECART_TYPE"].push(measurement.obsxyzSummary_[path].fStdev);
  });

  return makeGridData(cols, columns);
};

// ================================================= //
// ======= OBSERVATION MINING FUNCTIONS ============ //
// ================================================= //

const getECHOObsRows = (measurement) => {
  let cols = generateECHOObsCols();
  let columns = generateColsData(cols);

  let path = ["fECHO", "measECHO"];

  let obsData = measurement[path[0]].reduce((acc, curr) => {
    // reduce over all measurements
    for (let j = 0; j < curr[path[1]].length; j++) {
      // get all data defined in cols
      for (const key of Object.keys(cols)) {
        columns[key].push(getFromDict(curr, cols[key].path, [j], cols[key].unitConv));
      }
    }
    return acc;
  }, columns);

  return makeGridData(cols, obsData);
};

const getTSTNObsRows = (measurement, makeColumns) => {
  let cols = generateTSTNObsCols();
  let columns = generateColsData(cols);

  let obsData = measurement.fTSTN.reduce((acc, curr) => {
    // reduce over all measurements
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i]; // current rom
      if ("measPLR3D" in rom) {
        for (let j = 0; j < rom.measPLR3D.length; j++) {
          for (const key of Object.keys(cols)) {
            columns[key].push(getFromDict(curr, cols[key].path, [i, j], cols[key].unitConv));
          }
        }
      }
    }
    return acc;
  }, columns);

  return makeGridData(cols, obsData);
};

const getOBSXYZRows = (measurement) => {
  let cols = generateOBSXYZObsCols();
  let colsData = generateColsData(cols);

  let obsData = measurement.fOBSXYZ.reduce((acc, curr) => {
    // reduce over all measurements
    for (const key of Object.keys(cols)) {
      // get all data defined in cols
      colsData[key].push(getFromDict(curr, cols[key].path, [], cols[key].unitConv));
    }

    return acc;
  }, colsData);

  return makeGridData(cols, obsData);
};

// ================================================= //
// ============== FRAME TREE FUNCTIONS ============= //
// ================================================= //

export const getFrames = (data) => {
  let cols = generateFrameCols();
  let columns = generateColsData(cols);

  var obsData = data.tree.reduce((acc, curr) => {
    // reduce over all frames
    for (const key of Object.keys(cols)) {
      // get all data defined in cols
      columns[key].push(getFromDict(curr, cols[key].path, [], cols[key].unitConv));
    }
    return acc;
  }, columns);

  return makeGridData(cols, obsData);
};

export const getFrameTree = (data) => {
  // this function returns tree structure for react-d3-tree, structure is defined as nested dics
  // each node has { name, children }, children is array of nodes

  var structure = [];

  data.tree.forEach((frame, index) => {
    let children = structure;
    var node = {
      name: frame.frame.name,
      children: [],
    };

    frame.branch.forEach((frameName, index) => {
      if (!(frameName === frame.frame.name)) {
        children = children.find((child) => child.name === frameName).children;
      }
    });

    children.push(node);
  });

  return structure;
};

export const getFrameTreeEdges = (data) => {
  var acc = { nodes: [], edges: [], map: {} };

  data.tree.forEach((frame, index) => {
    let x = Math.random();
    let y = Math.random();

    var node = {
      id: frame.frame.name,
      label: frame.frame.name,
      x: x,
      y: y,
    };
    acc.nodes.push(node);
    acc.map[frame.frame.name] = node;
    if (frame.branch.length > 1) {
      acc.edges.push({
        from: frame.branch[frame.branch.length - 2],
        to: frame.frame.name,
      });
    }
  });

  return acc;
};

// ================================================= //
// ============= 3D POINTS SELECTION =============== //
// ================================================= //

const getVarTypeFromFixed = (fixedState) => {
  // compute point type from fixed state
  // convert fixed state T/F values to binary string, parse it as int and use it as index in pointTypes array (containing names)
  const index = parseInt(fixedState.map((i) => (i ? 1 : 0)).join(""), 2);
  return pointTypes[index];
};

const get3DPointEstData = (data, colNames) => {
  // function for obtaining tableData for 3D points from JSON file
  // ARGS: data - JSON file, colNames - array of column names (if empty, array returned insted of dictionary)
  // OUT: array of dictionaries with keys from colNames

  // map points to array of values which will be used in a table
  return data.points.map((point) => {
    let pointVals = [
      point.fName, // point name
      getVarTypeFromFixed(point.fixedState), // point variability type
      point.fFramePosition_Name, // point frame
      ...point.fEstimatedValueInRoot.fVector, // estimated coordinates
      point.fEstimatedHeightInRoot.fValue, // estimated height
      ...point.fEstimatedPrecision, // estimated precision
      ...point.fEstimatedValueInRoot.fVector.map(
        (estVal, i) => estVal - point.fProvisionalValueInRoot.fVector[i]
      ), // dx, dy, dz
    ];

    if (!(typeof colNames === "undefined")) {
      // convert array of values to dictionary with keys from colNames, so thtat this can be used in a table
      return colNames.reduce((acc, key, index) => {
        acc[key] = pointVals[index];
        return acc;
      }, {});
    }
    return pointVals;
  });
};