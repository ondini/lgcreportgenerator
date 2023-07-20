import {
  generateTSTNObsCols,
  generateECHOObsCols,
  generateOBSXYZObsCols,
} from "../data/tablesColumseee";
import {
  angleRad2CC,
  angleRad2GON,
  distM2HMM,
  measurementTypes,
} from "../data/constants";

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
        return (
          acc + (typeof val === "number" && val < 0 ? "(" + val + ")" : val)
        );
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
      } else if (
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key)
      ) {
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

// --- MAIN FUNCTION FOR DATA PROCESSING --- //
export const getObsData = (data) => {
  return data.tree.reduce((acc, curr) => {
    // reduce over all frames
    Object.keys(curr.measurements).forEach((key) => {
      // get measurement data for each measurement type
      if (measurementTypes.includes(key)) {
        // this filters measurement types from other attributess
        let obsData = obsTypeSelector(curr.measurements, key);
        acc = mergeRowsData(key, acc, obsData);
      }
    });
    return acc;
  }, {});
};

// ================================================= //
// ======= OBSERVATION MINING FUNCTIONS ============ //
// ================================================= //

export const getECHOObsRows = (measurement) => {
  let cols = generateECHOObsCols();
  let columns = {};
  Object.keys(cols).forEach((key) => {
    columns[key] = [];
  });

  let path = ["fECHO", "measECHO"];

  let obsData = measurement[path[0]].reduce((acc, curr) => {
    // reduce over all measurements
    for (let j = 0; j < curr[path[1]].length; j++) {
      // get all data defined in cols
      for (const key of Object.keys(cols)) {
        columns[key].push(
          getFromDict(curr, cols[key].path, [j], cols[key].unitConv)
        );
      }
    }
    return acc;
  }, columns);

  return makeGridData(cols, obsData);
};

const getTSTNObsRows = (measurement, makeColumns) => {
  let cols = generateTSTNObsCols();
  let columns = {};
  Object.keys(cols).forEach((key) => {
    columns[key] = [];
  });

  let obsData = measurement.fTSTN.reduce((acc, curr) => {
    // reduce over all measurements
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i]; // current rom
      if ("measPLR3D" in rom) {
        for (let j = 0; j < rom.measPLR3D.length; j++) {
          for (const key of Object.keys(cols)) {
            columns[key].push(
              getFromDict(curr, cols[key].path, [j], cols[key].unitConv)
            );
          }
        }
      }
    }
    return acc;
  }, columns);

  return makeGridData(columns, obsData);
};

const getOBSXYZRows = (measurement) => {
  let cols = generateOBSXYZObsCols();
  let colsData = {};
  Object.keys(cols).forEach((key) => {
    colsData[key] = [];
  });

  let obsData = measurement.fOBSXYZ.reduce((acc, curr) => {
    // reduce over all measurements
    for (const key of Object.keys(cols)) {
      // get all data defined in cols
      colsData[key].push(
        getFromDict(curr, cols[key].path, [], cols[key].unitConv)
      );
    }

    return acc;
  }, colsData);

  return makeGridData(cols, obsData);
};
