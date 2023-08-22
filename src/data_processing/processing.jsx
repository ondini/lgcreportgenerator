import {
  generateTSTNPaths,
  generateTSTNObsCols,
  generateMeasurementsCols,
  generateFrameCols,
  generatePoint3DCols,
  generateObsCols,
} from "../data/columnsData";
import { measurementTypes, pointTypes } from "../data/constants";

// ================== DESCRIPTION ================== //
// This file contains functions that are used to process data from LGC_DATA
// the paths to the data are specified in the columns files
// ================================================== //

// ================================================= //
// ============== UTILITY FUNCTIONS ================ //
// ================================================= //

const functionsSwitch = (value, fun) => {
  switch (fun) {
    case "abs":
      return Math.abs(value);
    case "sqrt":
      return Math.sqrt(value);
    default:
      return value;
  }
};
const functionsSupported = ["abs", "sqrt"];

const getFromDict = (data, path, iteratorVals, unitConv, lookupTab = {}, subresult = false) => {
  // function used to get data from neseted dictionaries using path where each key is separated by "/"
  // if key is "i" then it is replaced by value from iterator array
  // if "!" is present in path, then the paths are interpreted as values to be used in expression resulting after splitting on ! and replacing the paths
  // if lkp: is prefix of the path, use lookupTab to look for the value based on value following the prefix -> This is used for valus, which are not present
  //     in the passed data and need to be obtained from different parts of JSON, preprocessed and passed separately like this.

  if (path.startsWith("!")) {
    // expression evaluation part
    let exprArr = path.split("!");
    let expr = exprArr.reduce((acc, curr) => {
      if (["", "+", "-", "*", "/"].includes(curr)) {
        return acc + curr;
      } else if (functionsSupported.some((fun) => curr.includes(fun))) {
        let vals = curr.split("(");
        let fun = vals[0];
        let val = getFromDict(data, vals[1].slice(0, -1), iteratorVals, unitConv, lookupTab, true); // slice to remove second bracket
        return acc + functionsSwitch(val, fun);
      } else {
        let val = getFromDict(data, curr, iteratorVals, unitConv, lookupTab, true);
        return acc + (typeof val === "number" && val < 0 ? "(" + val + ")" : val);
      }
    }, "");
    return unitConv(eval(expr));
  } else if (path.startsWith("lkp:")) {
    const key = getFromDict(data, path.slice(4), iteratorVals, unitConv, lookupTab, true); // slice 4, becasuse that is the lkp: offset
    return lookupTab[key];
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
      if (!(key in res)) {
        console.log("Error: path not found: " + path);
        return undefined;
      }
      res = res[key];
    });
    return subresult ? res : unitConv(res);
  }
};

const makeGridData = (cols, data, makeResiduals = false) => {
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

  let returnData = { data: rowData, columnDetails: columnDetails };
  if (makeResiduals) {
    const residualsData = {};
    const metaCols = ["TGTPOS", "TGTLINE", "INSPOS", "INSLINE"];
    colNames.forEach((colName) => {
      if (colName.indexOf("RES") !== -1 || metaCols.includes(colName)) {
        residualsData[colName] = data[colName];
      }
      returnData.residualsData = residualsData;
    });
  }

  return returnData;
};

const mergeRowsData = (measType, acc, obsData) => {
  if (!(measType in acc)) {
    acc[measType] = obsData;
  } else {
    acc[measType].data = acc[measType].data.concat(obsData.data);
    if ("residualsData" in acc[measType]) {
      Object.keys(acc[measType].residualsData).forEach((key) => {
        acc[measType].residualsData[key] = acc[measType].residualsData[key].concat(obsData.residualsData[key]);
      });
    }
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
    case "fTSTN":
      return getTSTNObsRows(measurement);
    case "fCAM":
      return getCAMDRows(measurement);
    case "fECWI":
    case "fECWS":
    case "fECHO":
    case "fEDM":
    case "fORIE":
    case "fLEVEL":
    case "fINCLY":
      return getXObsRows(measurement, type);
    case "fRADI":
    case "fOBSXYZ":
    case "fDVER":
      return getNTObsRows(measurement, type);
    default:
      return { data: [], columnDetails: [] };
  }
};

const statTypeSelector = (measurement, type) => {
  const fOBSXYZPaths = [
    ["X", "obsxyzSummary_", "obsXObsSum"],
    ["Y", "obsxyzSummary_", "obsYObsSum"],
    ["Z", "obsxyzSummary_", "obsZObsSum"],
  ];

  const fECWIPaths = [
    ["X", "ecwiSummary_", "xObsSum"],
    ["Z", "ecwiSummary_", "zObsSum"],
  ];

  const UVDPaths = [
    ["X", "uvdSummary_", "xVectorCompObsSum"],
    ["Y", "uvdSummary_", "yVectorCompObsSum"],
    ["DIST", "uvdSummary_", "distObsSum"],
  ];

  const UVECPaths = [
    ["X", "uvecSummary_", "xVectorCompObsSum"],
    ["Y", "uvecSummary_", "yVectorCompObsSum"],
  ];

  switch (type) {
    case "fTSTN":
      return getTSTNMeasurementRows(measurement);
    case "fOBSXYZ":
      return getOBSXYZMeasurementRows(measurement, fOBSXYZPaths);
    case "fECWI":
      return getNestedMeasurementRows(measurement, fECWIPaths, "fECWI");
    case "fECHO":
      return getXMeasurementRows(measurement, ["fECHO", "echoSummary_"]);
    case "fORIE":
      return getXMeasurementRows(measurement, ["fORIE", "orieSummary_"]);
    case "fECWS":
      return getXMeasurementRows(measurement, ["fECWS", "ecwsSummary_"]);
    case "fEDM":
      return getXMeasurementRows(measurement, ["fEDM", "dsptSummary_"]);
    case "fRADI":
      return getNTMeasurementRows(measurement, ["fRADI", "radiSummary_"]);
    case "fDVER":
      return getNTMeasurementRows(measurement, ["fDVER", "dverSummary_"]);
    case "fINCLY":
      return getXMeasurementRows(measurement, ["fINCLY", "inclySummary_"]);
    case "fLEVEL":
      return getXMeasurementRows(measurement, ["fLEVEL", "dlevSummary_"]);
    // as only dlev is populated and dhorSummary is ignored also in SP result file, I am ignoring it here, too
    // let dlevRows = getXMeasurementRows(measurement, ["fLEVEL", "dlevSummary_"]);
    // let dhorRows = getXMeasurementRows(measurement, ["fLEVEL", "dhorSummary_"]);
    // return { data: dlevRows.data.concat(dhorRows.data), columnDetails: dlevRows.columnDetails };
    case "fCAM":
      let uvecRows = getNestedMeasurementRows(measurement, UVECPaths, "fCAM");
      let uvdRows = getNestedMeasurementRows(measurement, UVDPaths, "fCAM");
      return { data: uvecRows.data.concat(uvdRows.data), columnDetails: uvecRows.columnDetails };
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
export const getData = (data, dataType, lookup = {}) => {
  return data.tree.reduce((acc, curr) => {
    // reduce over all frames
    Object.keys(curr.measurements).forEach((measType) => {
      // get measurement data for each measurement type
      if (measurementTypes.includes(measType)) {
        // this filters measurement types from other attributess
        let obsData = dataTypeSelector(dataType)({ ...curr.measurements, lookup, frame: curr.frame }, measType);
        acc = mergeRowsData(measType, acc, obsData);
      }
    });
    return acc;
  }, {});
};

// ================================================= //
// ============= STATIONS OVERVIEW ================= //
// ================================================= //

const getTSTNMeasurementRows = (measurement) => {
  let cols = generateMeasurementsCols();
  let columns = generateColsData(cols);

  let keys = ["anglSummary_", "zendSummary_", "distSummary_", "dhorSummary_"];
  measurement.fTSTN.forEach((curr) => {
    // go over all measurements
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i]; // current rom
      // reduce over all roms
      keys.forEach((measName) => {
        // check all subtypes and add its values if present
        if (measName in rom) {
          for (const key of Object.keys(cols)) {
            if (key !== "TYPE" && key !== "MMT_LINE") {
              columns[key].push(rom[measName][cols[key].keyword]);
            }
          }
          columns["MMT_LINE"].push(measurement.lookup[columns["MMT_POS"].slice(-1)]);
          columns["TYPE"].push(measName.slice(0, -8).toUpperCase());
        }
      });

      if ("plr3dSummary_" in rom) {
        // check if plr3d is present
        [
          ["ANGL", "anglObsSum"],
          ["ZEND", "zendObsSum"],
          ["DIST", "distObsSum"],
        ].forEach(([key, path]) => {
          if ("plr3dSummary_" in rom) {
            for (const key of Object.keys(cols)) {
              if (key !== "TYPE" && key !== "MMT_LINE") {
                columns[key].push(rom["plr3dSummary_"][path][cols[key].keyword]);
              }
            }
            columns["MMT_LINE"].push(measurement.lookup[columns["MMT_POS"].slice(-1)]);
            columns["TYPE"].push("PL3D:" + key);
          }
        });
      }
    }
  });

  return makeGridData(cols, columns);
};

const getNestedMeasurementRows = (measurement, paths, measType) => {
  // function that gets data for observation table for ECWI, CAM
  let cols = generateMeasurementsCols();
  let columns = generateColsData(cols);

  paths.forEach(([obsName, sumPath, sumType]) => {
    // obsName is the name of the observation, X, Y ..
    // sumPath is the path to the observation summary, uvdSummary_
    // sumType is summary type name, yVectorCompObsSum ...
    measurement[measType].forEach((curr) => {
      if (sumType in curr[sumPath]) {
        for (const key of Object.keys(cols)) {
          if (key !== "TYPE" && key !== "MMT_LINE") {
            columns[key].push(curr[sumPath][sumType][cols[key].keyword]);
          }
        }
        columns["TYPE"].push(sumPath.slice(0, -8).toUpperCase() + ":" + obsName);
        columns["MMT_LINE"].push(measurement.lookup[columns["MMT_POS"].slice(-1)]);
      }
    });
  });

  return makeGridData(cols, columns);
};

const getOBSXYZMeasurementRows = (measurement, paths) => {
  // function that gets data for observation table for OBSXYZ
  let cols = generateMeasurementsCols();
  let columns = generateColsData(cols);

  paths.forEach(([obsName, sumPath, sumType]) => {
    // obsName is the name of the observation, X, Y ..
    // sumPath is the path to the observation summary, uvdSummary_
    // sumType is summary type name, yVectorCompObsSum ...

    for (const key of Object.keys(cols)) {
      if (key !== "TYPE" && key !== "MMT_LINE") {
        columns[key].push(measurement[sumPath][sumType][cols[key].keyword]);
      }
    }
    columns["TYPE"].push(sumPath.slice(0, -8).toUpperCase() + ":" + obsName);
    columns["MMT_LINE"].push(measurement.lookup[columns["MMT_POS"].slice(-1)]);
  });

  return makeGridData(cols, columns);
};

const getXMeasurementRows = (measurement, path) => {
  // same for ECWS, ECHO echoSummary_, EDM dsptSummary_, ORIE orieSummary_,
  let cols = generateMeasurementsCols();
  let columns = generateColsData(cols);

  const [obsType, sumPath] = path; // obsTyoe is e.g. fECHO.. , sumPath is echoSummary_

  measurement[obsType].forEach((curr) => {
    if (curr[sumPath].fIsInitialised) {
      for (const key of Object.keys(cols)) {
        if (key !== "TYPE" && key !== "MMT_LINE") {
          columns[key].push(curr[sumPath][cols[key].keyword]);
        }
      }
      columns["TYPE"].push(sumPath.slice(0, -8).toUpperCase());
      columns["MMT_LINE"].push(measurement.lookup[columns["MMT_POS"].slice(-1)]);
    }
  });

  return makeGridData(cols, columns);
};

const getNTMeasurementRows = (measurement, path) => {
  // DVER, RADI is the same
  let cols = generateMeasurementsCols();
  let columns = generateColsData(cols);

  const [obsType, sumPath] = path;

  for (const key of Object.keys(cols)) {
    if (key !== "TYPE" && key !== "MMT_LINE") {
      columns[key].push(measurement[sumPath][cols[key].keyword]);
    }
  }
  columns["TYPE"].push(obsType.slice(1));
  columns["MMT_LINE"].push(measurement.lookup[columns["MMT_POS"].slice(-1)]);

  return makeGridData(cols, columns);
};

// ================================================= //
// ======= OBSERVATION MINING FUNCTIONS ============ //
// ================================================= //

// this is used jointly with residual data to get the data for the histogram,
// since the data is already mined for observation table and it is uneffective to do it again

const getXObsRows = (measurement, measType) => {
  // function that gets data for observation table for measType,
  // this is joint function for ORI, ECHO, ECWS, EDM

  let cols = generateObsCols(measType);
  let columns = generateColsData(cols);

  const path = [measType, cols.TGTPOS.path.split("/")[0]];
  measurement[path[0]].forEach((curr) => {
    // reduce over all measurements
    for (let j = 0; j < curr[path[1]].length; j++) {
      // get all data defined in cols
      for (const key of Object.keys(cols)) {
        if (key !== "FRAME" && key !== "FRAMELINE") {
          columns[key].push(getFromDict(curr, cols[key].path, [j], cols[key].unitConv, measurement.lookup));
        }
      }

      columns["FRAME"].push(measurement.frame.name);
      columns["FRAMELINE"].push(measurement.frame.line);
    }
  });

  return makeGridData(cols, columns, true);
};

const getNTObsRows = (measurement, measType) => {
  // function that gets data for observation table specifically for No Type measurements

  let cols = generateObsCols(measType);
  let colsData = generateColsData(cols);

  measurement[measType].forEach((curr) => {
    // reduce over all measurements
    for (const key of Object.keys(cols)) {
      // get all data defined in cols
      if (key !== "FRAME" && key !== "FRAMELINE") {
        colsData[key].push(getFromDict(curr, cols[key].path, [], cols[key].unitConv, measurement.lookup));
      }
      colsData["FRAME"].push(measurement.frame.name);
      colsData["FRAMELINE"].push(measurement.frame.line);
    }
  });

  return makeGridData(cols, colsData, true);
};

const getCAMDRows = (measurement) => {
  // function that gets data for observation table for measType,
  // this is joint function for ORI, ECHO, ECWS, EDM

  let cols = generateObsCols("UVD");
  let cols2 = generateObsCols("UVEC");
  let columns = generateColsData(cols);

  measurement.fCAM.forEach((curr) => {
    // reduce over all measurements
    for (let j = 0; j < curr.measUVD.length; j++) {
      // get all data defined in cols
      for (const key of Object.keys(cols)) {
        if (key !== "TYPE" && key !== "FRAME" && key !== "FRAMELINE") {
          columns[key].push(getFromDict(curr, cols[key].path, [j], cols[key].unitConv, measurement.lookup));
        }
      }
      columns["TYPE"].push("UVD");
      columns["FRAME"].push(measurement.frame.name);
      columns["FRAMELINE"].push(measurement.frame.line);
    }

    for (let j = 0; j < curr.measUVEC.length; j++) {
      for (const key of Object.keys(cols)) {
        if (key !== "TYPE") {
          if (key in cols2) {
            columns[key].push(getFromDict(curr, cols2[key].path, [j], cols[key].unitConv, measurement.lookup));
          } else {
            columns[key].push(undefined);
          }
        }
      }
      columns["TYPE"].push("UVEC");
      columns["FRAME"].push(measurement.frame.name);
      columns["FRAMELINE"].push(measurement.frame.line);
    }
  });

  return makeGridData(cols, columns, true);
};

const getTSTNObsRows = (measurement) => {
  // function that gets data for observation table specifically for TSTN
  // due to it special structure with roms and subtypes
  let cols = generateTSTNObsCols();
  let columns = generateColsData(cols);
  let allColPaths = generateTSTNPaths();

  let keys = ["measPLR3D", "measANGL", "measZEND", "measDIST", "measDHOR"];

  const getTSTNRowVal = (allColPaths, curr, cols, iterationIndices, measName, key, lookupTab) => {
    // function that gets value for each row in TSTN
    if (measName == "measPLR3D") {
      return getFromDict(curr, cols[key].path, iterationIndices, cols[key].unitConv, lookupTab);
    } else if (key in allColPaths[measName]) {
      return getFromDict(curr, allColPaths[measName][key].path, iterationIndices, cols[key].unitConv, lookupTab);
    } else {
      return undefined;
    }
  };

  measurement.fTSTN.forEach((curr) => {
    // reduce over all measurements
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i]; // current rom
      keys.forEach((measName) => {
        // reduce over all subtypes
        if (measName in rom) {
          // if subtype exists
          for (let j = 0; j < rom[measName].length; j++) {
            // reduce over all observations
            for (const key of Object.keys(cols)) {
              // check all data defined in cols
              if (key !== "TYPE" && key !== "FRAME" && key !== "FRAMELINE") {
                columns[key].push(getTSTNRowVal(allColPaths, curr, cols, [i, j], measName, key, measurement.lookup));
              }
            }
            columns["TYPE"].push(measName.slice(4));
            columns["FRAME"].push(measurement.frame.name);
            columns["FRAMELINE"].push(measurement.frame.line);
          }
        }
      });
    }
  });

  return makeGridData(cols, columns, true);
};

// ================================================= //
// ============== FRAME TREE FUNCTIONS ============= //
// ================================================= //

export const getFrames = (data) => {
  // this function returns tree structure for react-d3-tree, structure is defined as nested dics
  // each node has { name, children }, children is array of nodes
  let cols = generateFrameCols();
  let columns = generateColsData(cols);

  var tree = [];
  let unknownPars = 0;

  data.tree.forEach((frame, index) => {
    // create tree structure
    let children = tree;
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

    // push frame data
    for (const key of Object.keys(cols)) {
      // get all data defined in cols
      columns[key].push(getFromDict(frame, cols[key].path, [], cols[key].unitConv));
    }

    frame.frame.fixedTranfParam.forEach((curr) => (unknownPars += curr ? 0 : 1));
  });

  return { tree: tree, ...makeGridData(cols, columns), unknownPars: unknownPars };
};

// ================================================= //
// ============= 3D POINTS SELECTION =============== //
// ================================================= //

// 3D points for table
export const get3DPointData = (data, colNames) => {
  let cols = generatePoint3DCols();
  let columns = generateColsData(cols);
  let lookupTable = {};
  let unknownPars = 0;

  data.points.forEach((curr) => {
    // reduce over all frames
    for (const key of Object.keys(cols)) {
      // get all data defined in cols
      let val = getFromDict(curr, cols[key].path, [], cols[key].unitConv);
      columns[key].push(val);
    }
    curr.fixedState.forEach((curr) => (unknownPars += curr ? 0 : 1));
    lookupTable[columns["NAME"].slice(-1)[0]] = columns["LINE"].slice(-1)[0] > 0 ? columns["LINE"].slice(-1)[0] : 0;
  });

  return {
    ...makeGridData(cols, columns),
    lookup: lookupTable,
    coords: { X: columns.X, Y: columns.Y, Z: columns.Z },
    unknownPars: unknownPars,
  };
};

// 3D points for 3D plot
const estCoordSelector = (point) => {
  return point.fEstimatedValueInRoot.fVector;
};

const initCoordSelector = (point) => {
  return point.fProvisionalValueInRoot.fVector;
};

export const get3DPoints = (data, type) => {
  // get array of 3D points coordinates - either estimated or initial based on type
  return data.points.map(type === "est" ? estCoordSelector : initCoordSelector);
};
