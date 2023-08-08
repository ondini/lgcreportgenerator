import {
  generateTSTNPaths,
  generateTSTNObsCols,
  generateECHOObsCols,
  generateOBSXYZObsCols,
  generateORIEObsCols,
  generateRADIObsCols,
  generateDSPTObsCols,
  generateECWSObsCols,
  generateECWIObsCols,
  generateDVERObsCols,
  generateStationsCols,
  generateFrameCols,
  generatePoint3DCols,
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
    case "fECWI":
    case "fECWS":
    case "fECHO":
    case "fEDM":
    case "fORIE":
      return getXObsRows(measurement, type);
    case "fRADI":
    case "fOBSXYZ":
    case "fDVER":
      return getNTObsRows(measurement, type);
    default:
      return {};
  }
};

const statTypeSelector = (measurement, type) => {
  const fOBSXYZPaths = [
    ["X", "obsxyzSummary_", "obsXObsSum"],
    ["Y", "obsxyzSummary_", "obsYObsSum"],
    ["Z", "obsxyzSummary_", "obsZObsSum"],
  ];

  const fECWIPaths = [
    ["X", "ecwiSummary_", "XObsSum"],
    ["Z", "ecwiSummary_", "ZObsSum"],
  ];

  switch (type) {
    case "fTSTN":
      return getTSTNStationRows(measurement);
    case "fOBSXYZ":
      return getNestedStationRows(measurement, fOBSXYZPaths);
    case "fECWI":
      return getNestedStationRows(measurement, fECWIPaths);
    case "fECHO":
      return getXStationRows(measurement, ["fECHO", "echoSummary_"]);
    case "fORIE":
      return getXStationRows(measurement, ["fORIE", "orieSummary_"]);
    case "fECWS":
      return getXStationRows(measurement, ["fECWS", "ecwsSummary_"]);
    case "fEDM":
      return getXStationRows(measurement, ["fEDM", "dsptSummary_"]);
    case "fRADI":
      return getNTStationRows(measurement, ["fRADI", "radiSummary_"]);
    case "fDVER":
      return getNTStationRows(measurement, ["fDVER", "dverSummary_"]);
    default:
      return {};
  }
};

const generateObsCols = (type) => {
  switch (type) {
    case "fOBSXYZ":
      return generateOBSXYZObsCols();
    case "fECHO":
      return generateECHOObsCols();
    case "fECWS":
      return generateECWSObsCols();
    case "fECWI":
      return generateECWIObsCols();
    case "fEDM":
      return generateDSPTObsCols();
    case "fRADI":
      return generateRADIObsCols();
    case "fORIE":
      return generateORIEObsCols();
    case "fDVER":
      return generateDVERObsCols();
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
// ============= STATIONS OVERVIEW ================= //
// ================================================= //

const getTSTNStationRows = (measurement) => {
  let cols = generateStationsCols();
  let columns = generateColsData(cols);

  let keys = ["anglSummary_", "zendSummary_", "distSummary_", "dhorSummary_"];

  let obsData = measurement.fTSTN.reduce((acc, curr) => {
    // reduce over all measurements
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i]; // current rom
      // reduce over all roms
      keys.forEach((measName) => {
        // check all subtypes and add its values if present
        if (measName in rom) {
          for (const key of Object.keys(cols)) {
            if (key !== "TYPE") {
              columns[key].push(rom[measName][cols[key].keyword]);
            }
          }
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
            acc["TYPE"].push("PLR3D:" + key);
            acc["STN_POS"].push(rom.plr3dSummary_[path].fObsText);
            acc["RES_MAX"].push(rom.plr3dSummary_[path].fResMax);
            acc["RES_MIN"].push(rom.plr3dSummary_[path].fResMin);
            acc["RES_AVG"].push(rom.plr3dSummary_[path].fMean);
            acc["ECART_TYPE"].push(rom.plr3dSummary_[path].fStdev);
          }
        });
      }
    }

    return acc;
  }, columns);

  return makeGridData(cols, obsData);
};

const getNestedStationRows = (measurement, paths) => {
  // function that gets data for observation table for measType,
  // OBSXYZ, ECWI
  let cols = generateStationsCols();
  let columns = generateColsData(cols);

  paths.forEach(([obsName, pathObsType, pathObsName]) => {
    columns["TYPE"].push(pathObsType.slice(0, -8).toUpperCase() + ":" + obsName);
    for (const key of Object.keys(cols)) {
      if (key !== "TYPE") {
        columns[key].push(measurement[pathObsType][pathObsName][cols[key].keyword]);
      }
    }
  });

  return makeGridData(cols, columns);
};

const getXStationRows = (measurement, path) => {
  // same for ECWS, ECHO echoSummary_, EDM dsptSummary_, ORIE orieSummary_,
  let cols = generateStationsCols();
  let columns = generateColsData(cols);

  const [obsType, sumPath] = path;

  let obsData = measurement[obsType].reduce((acc, curr) => {
    for (const key of Object.keys(cols)) {
      if (key !== "TYPE") {
        acc[key].push(curr[sumPath][cols[key].keyword]);
      }
    }
    acc["TYPE"].push(obsType.slice(1));
    return acc;
  }, columns);

  return makeGridData(cols, obsData);
};

const getNTStationRows = (measurement, path) => {
  // DVER, RADI is the same
  let cols = generateStationsCols();
  let columns = generateColsData(cols);

  const [obsType, sumPath] = path;

  columns["TYPE"].push(obsType.slice(1));
  for (const key of Object.keys(cols)) {
    if (key !== "TYPE") {
      columns[key].push(measurement[sumPath][cols[key].keyword]);
    }
  }

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

  return makeGridData(cols, obsData, true);
};

const getNTObsRows = (measurement, measType) => {
  // function that gets data for observation table specifically for No Type measurements

  let cols = generateObsCols(measType);
  let colsData = generateColsData(cols);

  let obsData = measurement[measType].reduce((acc, curr) => {
    // reduce over all measurements
    for (const key of Object.keys(cols)) {
      // get all data defined in cols
      colsData[key].push(getFromDict(curr, cols[key].path, [], cols[key].unitConv));
    }

    return acc;
  }, colsData);

  return makeGridData(cols, obsData, true);
};

const getTSTNObsRows = (measurement) => {
  // function that gets data for observation table specifically for TSTN
  // due to it special structure with roms and subtypes
  let cols = generateTSTNObsCols();
  let columns = generateColsData(cols);
  let allColPaths = generateTSTNPaths();

  let keys = ["measPLR3D", "measANGL", "measZEND", "measDIST", "measDHOR"];

  const getTSTNRowVal = (allColPaths, curr, cols, iterationIndices, measName, key) => {
    // function that gets value for each row in TSTN
    // console.log(measName, key);
    if (measName == "measPLR3D") {
      return getFromDict(curr, cols[key].path, iterationIndices, cols[key].unitConv);
    } else if (key in allColPaths[measName]) {
      return getFromDict(curr, allColPaths[measName][key].path, iterationIndices, cols[key].unitConv);
    } else {
      return undefined;
    }
  };

  let obsData = measurement.fTSTN.reduce((acc, curr) => {
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
              if (key !== "TYPE"){
              columns[key].push(getTSTNRowVal(allColPaths, curr, cols, [i, j], measName, key));
              }
            }
            columns["TYPE"].push(measName.slice(4));
          }
        }
      });
    }
    return acc;
  }, columns);

  return makeGridData(cols, obsData, true);
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

// 3D points for table
export const get3DPointEstData = (data, colNames) => {
  let cols = generatePoint3DCols();
  let columns = generateColsData(cols);

  var obsData = data.points.reduce((acc, curr) => {
    // reduce over all frames
    for (const key of Object.keys(cols)) {
      // get all data defined in cols
      columns[key].push(getFromDict(curr, cols[key].path, [], cols[key].unitConv));
    }
    return acc;
  }, columns);

  return makeGridData(cols, obsData);
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
