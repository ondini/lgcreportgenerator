import { generateTSTNObsCols, generateECHOObsCols } from "../data/tablesColums";
import { angleRad2CC, angleRad2GON, distM2HMM } from "../data/constants";

const getFromDictP = (data, path, it, unitConv, formatter) => {
  if (path.startsWith("!")) {
    let exprArr = path.split("!");
    let expr = exprArr.reduce((acc, curr) => {
      if (["", "+", "-", "*", "/"].includes(curr)) {
        return acc + curr;
      } else {
        let val = getFromDictP(data, curr, it, unitConv);
        return (
          acc + (typeof val === "number" && val < 0 ? "(" + val + ")" : val)
        );
      }
    }, "");
    return eval(expr);
  } else {
    let pathArr = path.split("/");
    let res = data;
    let itIndex = 0;
    pathArr.forEach((key) => {
      if (key === "i") {
        key = it[itIndex++];
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
          getFromDictP(curr, cols[key].path, [j], cols[key].unitConv)
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

  var idO = 0;
  let obsData = measurement.fTSTN.reduce((acc, curr) => {
    // reduce over all measurements
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i]; // current rom
      if ("measPLR3D" in rom) {
        for (let j = 0; j < rom.measPLR3D.length; j++) {
          for (const key of Object.keys(cols)) {
            columns[key].push(
              getFromDictP(curr, cols[key].path, [j], cols[key].unitConv)
            );
          }

          // // == TOOLTIP DATA == //
          // acc["HI"].push(curr.instrumentHeightAdjustable.fEstimatedValue);
          // acc["SHI"].push(curr.instrumentHeightAdjustable.fEstimatedPrecision);
          // acc["ROT3D"].push(curr.rot3D);
          // acc["ACST"].push(rom.acst);
          // acc["V0"].push(rom.v0.fEstimatedValue * angleConvGON);
          // acc["SV0"].push(rom.v0.fEstimatedPrecision * angleConvCC);

          // // == OBS DATA == //
          // acc["id"].push(idO++);
          // acc["INSPOS"].push(curr.instrumentPos);
          // acc["INSLINE"].push(curr.line);
          // acc["INSID"].push(curr.instrument.ID);
          // acc["TGTPOS"].push(rom.measPLR3D[j].targetPos);
          // acc["TGTLINE"].push(rom.measPLR3D[j].line);
          // // == ANGL == //
          // acc["OBSANGL"].push(rom.measPLR3D[j].angles[0].fValue * angleConvGON);
          // acc["SANGL"].push(
          //   rom.measPLR3D[j].target.sigmaCombinedPLRAngl * angleConvCC
          // );
          // acc["CALCANGL"].push(
          //   (rom.measPLR3D[j].angles[0].fValue +
          //     rom.measPLR3D[j].anglesResiduals[0].fValue) *
          //     angleConvGON
          // );
          // acc["RESANGL"].push(
          //   rom.measPLR3D[j].anglesResiduals[0].fValue * angleConvCC
          // );
          // acc["RESSIGANGL"].push(
          //   rom.measPLR3D[j].anglesResiduals[0].fValue /
          //     rom.measPLR3D[j].target.sigmaCombinedPLRAngl
          // );
          // acc["ECARTSANGL"].push(
          //   rom.measPLR3D[j].distances[0].fValue *
          //     rom.measPLR3D[j].anglesResiduals[0].fValue *
          //     distConv
          // );
          // // == ZEND == //
          // acc["OBSZEND"].push(rom.measPLR3D[j].angles[1].fValue * angleConvGON);
          // acc["SZEND"].push(
          //   rom.measPLR3D[j].target.sigmaCombinedPLRZenD * angleConvCC
          // );
          // acc["CALCZEND"].push(
          //   (rom.measPLR3D[j].angles[1].fValue +
          //     rom.measPLR3D[j].anglesResiduals[1].fValue) *
          //     angleConvGON
          // );
          // acc["RESZEND"].push(
          //   rom.measPLR3D[j].anglesResiduals[1].fValue * angleConvCC
          // );
          // acc["RESSIGZEND"].push(
          //   rom.measPLR3D[j].anglesResiduals[1].fValue /
          //     rom.measPLR3D[j].target.sigmaCombinedPLRZenD
          // );
          // acc["ECARTSZEND"].push(
          //   rom.measPLR3D[j].distances[0].fValue *
          //     rom.measPLR3D[j].anglesResiduals[1].fValue *
          //     distConv
          // );
          // // == DIST == //
          // acc["OBSDIST"].push(rom.measPLR3D[j].distances[0].fValue);
          // acc["SDIST"].push(
          //   rom.measPLR3D[j].target.sigmaCombinedPLRDist * distConv
          // );
          // acc["CALCDIST"].push(
          //   rom.measPLR3D[j].distances[0].fValue +
          //     rom.measPLR3D[j].distancesResiduals[0].fValue
          // );

          // acc["RESDIST"].push(
          //   rom.measPLR3D[j].distancesResiduals[0].fValue * distConv
          // );
          // acc["RESSIGDIST"].push(
          //   rom.measPLR3D[j].distancesResiduals[0].fValue /
          //     rom.measPLR3D[j].target.sigmaCombinedPLRDist
          // );
        }
      }
    }
    return acc;
  }, columns);

  return makeGridData(columns, obsData);
};

const obsDataSelector = (measurement, type) => {
  switch (type) {
    case "fECHO":
      return getECHOObsRows(measurement);
    case "fTSTN":
    case "fOBSXYZ":
    case "fECWS":
    case "fEDM":
    case "fRADI":
    default:
      return {};
  }
};

// -- main functions -- //
const mergeSmObsData = (resType, acc, obsData) => {
  if (!(resType in acc)) {
    acc[resType] = obsData;
  } else {
    acc[resType].data = acc[resType].data.concat(obsData.data);
  }
  return acc;
};

export const getObsData2 = (data) => {
  return data.tree.reduce((acc, curr) => {
    Object.keys(curr.measurements).forEach((key) => {
      if (key[0] === "f") {
        let obsData = obsDataSelector(curr.measurements, key);
        acc = mergeSmObsData(key, acc, obsData);
      }
    });
    return acc;
  }, {});
};
