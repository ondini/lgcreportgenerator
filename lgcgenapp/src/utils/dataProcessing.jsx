import { pointTypes } from "../data/constants";

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

const getVarTypeFromFixed = (fixedState) => {
  // compute point type from fixed state
  // convert fixed state T/F values to binary string, parse it as int and use it as index in pointTypes array (containing names)
  const index = parseInt(fixedState.map((i) => (i ? 1 : 0)).join(""), 2);
  return pointTypes[index];
};

export const get3DPointEstData = (data) => {
  // map points to array of values
  return data.points.map((point) => {
    return [
      point.fName, // point name
      getVarTypeFromFixed(point.fixedState), // point variability type
      ...point.fEstimatedValueInRoot.fVector, // estimated coordinates
      point.fEstimatedHeightInRoot.fValue, // estimated height
      ...point.fEstimatedPrecision, // estimated precision
      ...point.fEstimatedValueInRoot.fVector.map(
        (estVal, i) => estVal - point.fProvisionalValueInRoot.fVector[i]
      ), // dx, dy, dz
    ];
  });
};

export const get3DPointEstDataRows = (data, colNames) => {
  // map points to array of values which will be used in a table
  return data.points.map((point) => {
    let pointVals = [
      point.fName, // point name
      getVarTypeFromFixed(point.fixedState), // point variability type
      ...point.fEstimatedValueInRoot.fVector, // estimated coordinates
      point.fEstimatedHeightInRoot.fValue, // estimated height
      ...point.fEstimatedPrecision, // estimated precision
      ...point.fEstimatedValueInRoot.fVector.map(
        (estVal, i) => estVal - point.fProvisionalValueInRoot.fVector[i]
      ), // dx, dy, dz
    ];

    // convert array of values to dictionary with keys from colNames, so thtat this can be used in a table
    return colNames.reduce((acc, key, index) => {
      acc[key] = pointVals[index];
      return acc;
    }, {});
  });
};

const fSTNResidualsSelector = (measurement) => {
  let residuals = { ANGL: [], DIST: [], ZEND: [], TGTPOS: [], TGTID: [] };
  residuals = measurement.fTSTN.reduce((acc, curr) => {
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i];
      if ("measANGL" in rom) {
        for (let j = 0; j < rom.measANGL.length; j++) {
          acc["ANGL"].push(
            rom.measANGL[j].anglesResiduals[0].fValue * 63.662 * 10000
          );
          acc["DIST"].push(
            rom.measDIST[j].distancesResiduals[0].fValue * 100000
          );
          acc["ZEND"].push(
            rom.measZEND[j].anglesResiduals[0].fValue * 63.662 * 10000
          );
          acc["TGTPOS"].push(rom.measANGL[j].targetPos);
          acc["TGTID"].push(rom.measANGL[j].target.ID);
        }
      } else if ("measPLR3D" in rom) {
        for (let j = 0; j < rom.measPLR3D.length; j++) {
          acc["ANGL"].push(
            rom.measPLR3D[j].anglesResiduals[0].fValue * 63.662 * 10000
          );
          acc["DIST"].push(
            rom.measPLR3D[j].distancesResiduals[0].fValue * 100000
          );
          acc["ZEND"].push(
            rom.measPLR3D[j].anglesResiduals[1].fValue * 63.662 * 10000
          );
          acc["TGTPOS"].push(rom.measPLR3D[j].targetPos);
          acc["TGTID"].push(rom.measPLR3D[j].target.ID);
        }
      }
    }
    return acc;
  }, residuals);
  return residuals;
};

const fECWSesidualsSelector = (measurement) => {
  let residuals = { ECWS: [], TGTPOS: [], TGTID: [] };
  residuals = measurement.fECWS.reduce((acc, curr) => {
    for (let j = 0; j < curr.measECWS.length; j++) {
      acc["ECWS"].push(curr.measECWS[j].distancesResiduals[0].fValue * 100000);
      acc["TGTPOS"].push(curr.measECWS[j].targetPos);
      acc["TGTID"].push(curr.measECWS[j].target.ID);
    }
    return acc;
  }, residuals);
  return residuals;
};

const fOBSXYZSesidualsSelector = (measurement) => {
  let residuals = { X: [], Y: [], Z: [], TGTPOS: [], TGTID: [] };
  residuals = measurement.fOBSXYZ.reduce((acc, curr) => {
    acc.X.push(curr.fXResidual * 100000);
    acc.Y.push(curr.fYResidual * 100000);
    acc.Z.push(curr.fZResidual * 100000);
    acc.TGTPOS.push(curr.targetPos);
    acc.TGTID.push(curr.target);
    return acc;
  }, residuals);
  return residuals;
};

const residualsSelector = (measurement, type) => {
  switch (type) {
    case "fTSTN":
      return fSTNResidualsSelector(measurement);
    case "fOBSXYZ":
      return fOBSXYZSesidualsSelector(measurement);
    case "fECWS":
      return fECWSesidualsSelector(measurement);
    default:
      return {};
  }
};

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
        console.log(key);
        let residuals = residualsSelector(curr.measurements, key);
        console.log(residuals);
        acc = mergeResiduals(key, acc, residuals);
      }
    });
    return acc;
  }, {});
};
