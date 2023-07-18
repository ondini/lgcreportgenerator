
import { generateTSTNObsCols, generateECHOObsCols } from "../data/tablesColums";
import { angleRad2CC, angleRad2GON, distM2HMM } from "../data/constants";

const getFromDictP = (data, path) => {
    let pathArr = path.split(".");
    let res = data;
    pathArr.forEach((key) => {
      res = res[key];
    });
    return res;
  };
  
const getFromDict = (data, pathArr) => {
let res = data;
pathArr.forEach((key) => {
    res = res[key];
});
return res;
};


const angleGONFormatter = (value) => {
    if (value < 0) {
      return value + 400;
    }
    return value;
};


  

  const getECHOObsRows = (measurement) => {
    // function for obtaining residuals for TSTN measurement type from JSON file
    // ARGS: JSON file
    // OUT: dictionary of residuals with keys: ANGL, DIST, ZEND, TGTPOS, TGTLINE, INSPOS, INSLINE
  
  
    let cols = generateECHOObsCols();
    let columns = {};
    Object.keys(cols).forEach((key) => {
      columns[key] = [];
    });
  
    let idO = 0;
    let path = ["fECHO", "measECHO"];
  
    let obsData = measurement[path[0]].reduce((acc, curr) => {
      // reduce over all measurements
      for (let j = 0; j < curr[path[1]].length; j++) {
        // == TOOLTIP DATA == //
        for (let key in Object.keys(cols)) {
            acc[key].push(getFromDictP(cols[key].path))
        }
        // acc["PX"].push(
        //   curr.fMeasuredPlane.fReferencePoint.fEstimatedValue.fVector[0]
        // );
        // acc["PY"].push(
        //   curr.fMeasuredPlane.fReferencePoint.fEstimatedValue.fVector[1]
        // );
        // acc["O"].push(
        //   angleGONFormatter(curr.fMeasuredPlane.fEstValTheta * angleRad2GON)
        // );
        // acc["SO"].push(curr.fMeasuredPlane.fEstPrecisionTheta * angleRad2CC);
        // acc["SN"].push(curr.fMeasuredPlane.fEstPrecisionRefPtDist * distM2HMM);
  
        // // == OBS DATA == //
        // acc["id"].push(idO++);
        // acc["REFPT"].push(curr.fMeasuredPlane.fName);
        // acc["REFLINE"].push(curr.line);
        // acc["TGTPOS"].push(curr[path[1]][j].targetPos);
        // acc["TGTLINE"].push(curr[path[1]][j].line);
        acc["OBS"].push(curr[path[1]][j].distances[0].fValue);
        acc["SIGMA"].push(curr[path[1]][j].target.sigmaCombinedDist * distM2HMM);
        // acc["CALC"].push(
        //   curr[path[1]][j].distances[0].fValue +
        //     curr[path[1]][j].distancesResiduals[0].fValue
        // );
        // acc["RES"].push(curr[path[1]][j].distancesResiduals[0].fValue * distM2HMM);
        // acc["RESSIG"].push(
        //   curr[path[1]][j].distancesResiduals[0].fValue /
        //     curr[path[1]][j].target.sigmaCombinedDist
        // );
      }
      return acc;
    }, columns);

      let colNames = Object.keys(cols);
      let columnDetails = [];
      let hideCols = ["__row_group_by_columns_group__"];
      for (let i = 0; i < colNames.length; i++) {
        // columnDetails.push(cols[colNames[i]]);
        if (cols[colNames[i]].show) {
          columnDetails.push(cols[colNames[i]]); //hideCols.push(colNames[i]);
        }
      }
  
      // convert array of values to dictionary with keys from colNames, so thtat this can be used in a table
      obsData = obsData[colNames[0]].map((value, index) => {
        return colNames.reduce((acc, key) => {
          acc[key] = obsData[key][index];
          return acc;
        }, {});
      });
      return { data: obsData, columnss: columnDetails, hideCols: hideCols };
  };

  const getTSTNObsRows = (measurement, makeColumns) => {
    // function for obtaining residuals for TSTN measurement type from JSON file
    // ARGS: JSON file
    // OUT: dictionary of residuals with keys: ANGL, DIST, ZEND, TGTPOS, TGTLINE, INSPOS, INSLINE
  
    const angleConvCC = 63.662 * 10000; // radians to centesimal circle factor
    const angleConvGON = 63.662; // radians to gon factor
    const distConv = 1000; // meters to hundredths of milimeter factor
  
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
            // == TOOLTIP DATA == //
            acc["HI"].push(curr.instrumentHeightAdjustable.fEstimatedValue);
            acc["SHI"].push(curr.instrumentHeightAdjustable.fEstimatedPrecision);
            acc["ROT3D"].push(curr.rot3D);
            acc["ACST"].push(rom.acst);
            acc["V0"].push(rom.v0.fEstimatedValue * angleConvGON);
            acc["SV0"].push(rom.v0.fEstimatedPrecision * angleConvCC);
  
            // == OBS DATA == //
            acc["id"].push(idO++);
            acc["INSPOS"].push(curr.instrumentPos);
            acc["INSLINE"].push(curr.line);
            acc["INSID"].push(curr.instrument.ID);
            acc["TGTPOS"].push(rom.measPLR3D[j].targetPos);
            acc["TGTLINE"].push(rom.measPLR3D[j].line);
            // == ANGL == //
            acc["OBSANGL"].push(rom.measPLR3D[j].angles[0].fValue * angleConvGON);
            acc["SANGL"].push(
              rom.measPLR3D[j].target.sigmaCombinedPLRAngl * angleConvCC
            );
            acc["CALCANGL"].push(
              (rom.measPLR3D[j].angles[0].fValue +
                rom.measPLR3D[j].anglesResiduals[0].fValue) *
                angleConvGON
            );
            acc["RESANGL"].push(
              rom.measPLR3D[j].anglesResiduals[0].fValue * angleConvCC
            );
            acc["RESSIGANGL"].push(
              rom.measPLR3D[j].anglesResiduals[0].fValue /
                rom.measPLR3D[j].target.sigmaCombinedPLRAngl
            );
            acc["ECARTSANGL"].push(
              rom.measPLR3D[j].distances[0].fValue *
                rom.measPLR3D[j].anglesResiduals[0].fValue *
                distConv
            );
            // == ZEND == //
            acc["OBSZEND"].push(rom.measPLR3D[j].angles[1].fValue * angleConvGON);
            acc["SZEND"].push(
              rom.measPLR3D[j].target.sigmaCombinedPLRZenD * angleConvCC
            );
            acc["CALCZEND"].push(
              (rom.measPLR3D[j].angles[1].fValue +
                rom.measPLR3D[j].anglesResiduals[1].fValue) *
                angleConvGON
            );
            acc["RESZEND"].push(
              rom.measPLR3D[j].anglesResiduals[1].fValue * angleConvCC
            );
            acc["RESSIGZEND"].push(
              rom.measPLR3D[j].anglesResiduals[1].fValue /
                rom.measPLR3D[j].target.sigmaCombinedPLRZenD
            );
            acc["ECARTSZEND"].push(
              rom.measPLR3D[j].distances[0].fValue *
                rom.measPLR3D[j].anglesResiduals[1].fValue *
                distConv
            );
            // == DIST == //
            acc["OBSDIST"].push(rom.measPLR3D[j].distances[0].fValue);
            acc["SDIST"].push(
              rom.measPLR3D[j].target.sigmaCombinedPLRDist * distConv
            );
            acc["CALCDIST"].push(
              rom.measPLR3D[j].distances[0].fValue +
                rom.measPLR3D[j].distancesResiduals[0].fValue
            );
  
            acc["RESDIST"].push(
              rom.measPLR3D[j].distancesResiduals[0].fValue * distConv
            );
            acc["RESSIGDIST"].push(
              rom.measPLR3D[j].distancesResiduals[0].fValue /
                rom.measPLR3D[j].target.sigmaCombinedPLRDist
            );
          }
        }
      }
      return acc;
    }, columns);
  
    if (makeColumns) {
      let colNames = Object.keys(cols);
      let columnDetails = [];
      let hideCols = ["__row_group_by_columns_group__"];
      for (let i = 0; i < colNames.length; i++) {
        //columnDetails.push(cols[colNames[i]]);
        if (cols[colNames[i]].show) {
          columnDetails.push(cols[colNames[i]]); //hideCols.push(colNames[i]);
        }
      }
  
      // convert array of values to dictionary with keys from colNames, so thtat this can be used in a table
      obsData = obsData[colNames[0]].map((value, index) => {
        return colNames.reduce((acc, key) => {
          acc[key] = obsData[key][index];
          return acc;
        }, {});
      });
      return { data: obsData, columnss: columnDetails, hideCols: hideCols };
    }
  
    return obsData;
  };