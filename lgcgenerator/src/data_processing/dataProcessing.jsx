import { pointTypes } from "../data/constants";

///  --- Data formatting functions --- ///

export function generateNumFormatter(decimals, factor) {
  // function to generate a function, serving as number formatter for the DataGrid
  return (params) => {
    const roundedValue = Math.round(params.value * factor * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
    return roundedValue;
  };
}

export function numFormatter(number, decimals) {
  // function to generate a function, serving as number formatter for the DataGrid
  return Math.round(number * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
}

///  --- Residuals data selection  --- ///

// -- selectors -- //
const fTSTNResidualsSelector = (measurement) => {
  // function for obtaining residuals for TSTN measurement type from JSON file
  // ARGS: JSON file
  // OUT: dictionary of residuals with keys: ANGL, DIST, ZEND, TGTPOS, TGTLINE, INSPOS, INSLINE

  const angleConv = 63.662 * 10000; // radians to centesimal circle factor
  const distConv = 100000; // meters to hundredths of milimeter factor

  let residuals = {
    ANGL: [], // angle residuals
    DIST: [], // distance residuals
    ZEND: [], // zenith residuals
    TGTPOS: [], // target position
    TGTLINE: [], // target line
    INSPOS: [], // instrument position
    INSLINE: [], // instrument line
  }; // residuals data

  residuals = measurement.fTSTN.reduce((acc, curr) => {
    // reduce over all measurements
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i]; // current rom
      let residualsKeys = // the paths to values are different, depending on the type of measurement (PLR3D or not)
        "measANGL" in rom ? ["measANGL", "measDIST", "measZEND"] : ["measPLR3D", "measPLR3D", "measPLR3D"];
      for (let j = 0; j < rom[residualsKeys[0]].length; j++) {
        acc["ANGL"].push(rom[residualsKeys[0]][j].anglesResiduals[0].fValue * angleConv);
        acc["DIST"].push(rom[residualsKeys[1]][j].distancesResiduals[0].fValue * distConv);
        acc["ZEND"].push(
          rom[residualsKeys[2]][j].anglesResiduals[residualsKeys[2] === "measPLR3D" ? 1 : 0].fValue * angleConv
        );
        acc["TGTPOS"].push(rom[residualsKeys[2]][j].targetPos);
        acc["TGTLINE"].push(rom[residualsKeys[2]][j].line);
        acc["INSPOS"].push(curr.instrumentPos);
        acc["INSLINE"].push(curr.line);
      }
    }
    return acc;
  }, residuals);
  return residuals;
};

const fMultResidualsSelector = (measurement, type) => {
  // function for obtaining residuals for ECWS, ECHO or DSPT measurement type from JSON file
  // it is all in one function, since the paths to values are the same
  // ARGS: JSON file
  // OUT: dictionary of residuals with keys: ECWS/ECHO/DSPT-DIST, TGTPOS, TGTID, TGTLINE, INSPOS, INSLINE

  const distConv = type === "fECWS" ? 100000 : 10000; // meters to hundredths (tenths) of milimeter factor

  const path =
    type === "fECWS" ? ["fECWS", "measECWS"] : type === "fECHO" ? ["fECHO", "measECHO"] : ["fEDM", "measDSPT"];

  const typeName = type === "fECWS" ? "ECWS" : type === "fECHO" ? "ECHO" : "DSPT";

  let residuals = {
    [typeName]: [], // distance residuals
    TGTPOS: [], // target position
    TGTLINE: [], // target line
    INSPOS: [], // instrument position
    INSLINE: [], // instrument line
  }; // residuals data

  residuals = measurement[path[0]].reduce((acc, curr) => {
    for (let j = 0; j < curr[path[1]].length; j++) {
      acc[typeName].push(curr[path[1]][j].distancesResiduals[0].fValue * distConv);
      acc["TGTPOS"].push(curr[path[1]][j].targetPos);
      acc["TGTLINE"].push(curr[path[1]][j].line);
      acc["INSPOS"].push(
        type === "fECWS"
          ? curr.fMeasuredWSHeight.fName
          : type === "fECHO"
          ? curr.fMeasuredPlane.fName
          : curr.instrumentPos
      );
      acc["INSLINE"].push(curr.line);
    }
    return acc;
  }, residuals);
  return residuals;
};

const fRADIResidualsSelector = (measurement) => {
  // function for obtaining residuals for ECWS measurement type from JSON file
  // ARGS: JSON file
  // OUT: dictionary of residuals with keys: ECWS, TGTPOS, TGTID

  const distConv = 1000; // meters to hundredths of milimeter factor

  let residuals = {
    RADI: [], // angle residuals
    TGTPOS: [], // target position
    TGTLINE: [], // target line
    INSPOS: [], // instrument position
    INSLINE: [], // instrument line
  }; // residuals data
  residuals = measurement.fRADI.reduce((acc, curr) => {
    acc["RADI"].push(curr.fResidual * distConv);
    acc["TGTPOS"].push(curr.targetPos);
    acc["TGTPOS"].push(curr.line);
    acc["INSPOS"].push("");
    acc["INSLINE"].push("");
    return acc;
  }, residuals);
  return residuals;
};

const fOBSXYZResidualsSelector = (measurement) => {
  // function for obtaining residuals for OBSXYZ measurement type from JSON file
  // ARGS: JSON file
  // OUT: dictionary of residuals with keys: X, Y, Z, TGTPOS, TGTID

  const distConv = 100000; // meters to hundredths of milimeter factor

  let residuals = {
    X: [],
    Y: [],
    Z: [],
    TGTPOS: [], // target position
    TGTLINE: [], // target line
    INSPOS: [], // instrument position
    INSLINE: [], // instrument line
  }; // residuals data

  residuals = measurement.fOBSXYZ.reduce((acc, curr) => {
    acc["X"].push(curr.fXResidual * distConv);
    acc["Y"].push(curr.fYResidual * distConv);
    acc["Z"].push(curr.fZResidual * distConv);
    acc["TGTPOS"].push(curr.targetPos);
    acc["TGTPOS"].push(curr.line);
    acc["INSPOS"].push("");
    acc["INSLINE"].push("");
    return acc;
  }, residuals);
  return residuals;
};

const residualsSelector = (measurement, type) => {
  switch (type) {
    case "fTSTN":
      return fTSTNResidualsSelector(measurement);
    case "fOBSXYZ":
      return fOBSXYZResidualsSelector(measurement);
    case "fECWS":
    case "fEDM":
    case "fECHO":
      return fMultResidualsSelector(measurement, type);
    case "fRADI":
      return fRADIResidualsSelector(measurement);
    default:
      return {};
  }
};

// -- main functions -- //
const mergeResiduals = (resType, acc, residuals) => {
  if (!(resType in acc)) {
    acc[resType] = residuals;
  } else {
    Object.keys(residuals).forEach((key) => {
      acc[resType][key] = acc[resType][key].concat(residuals[key]);
    });
  }
  return acc;
};

export const getResiduals = (data) => {
  return data.tree.reduce((acc, curr) => {
    Object.keys(curr.measurements).forEach((key) => {
      if (key[0] === "f") {
        let residuals = residualsSelector(curr.measurements, key);
        acc = mergeResiduals(key, acc, residuals);
      }
    });
    return acc;
  }, {});
};
