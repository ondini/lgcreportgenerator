import { generateNumFormatter, numFormatter } from "./dataProcessing";
import InstrumentTooltip from "../components/InstrumentTooltip";
import React from "react";
///  --- Table 2 data selection  --- ///

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

const fieldGen = (field, headerName, args = {}) => {
  let defaultArgs = {
    field: field,
    headerName: headerName,
    flex: 0.5,
    minWidth: 60,
    show: true,
    sortable: true,
  };

  Object.keys(args).forEach((key) => {
    if (key === "numDecs") {
      defaultArgs.valueFormatter = generateNumFormatter(args[key], 1);
    }
    defaultArgs[key] = args[key];
  });

  return defaultArgs;
};

// -- selectors -- //

const generatefTSTNColumns = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    HI: fieldGen("HI", "HI", { show: false }), // instrument height
    SHI: fieldGen("SHI", "SHI", { show: false }), // instrument height precision
    ROT3D: fieldGen("ROT3D", "ROT3D", { show: false }), //
    ACST: fieldGen("ACST", "ACST", { show: false }), //
    V0: fieldGen("V0", "V0", { show: false }), //
    SV0: fieldGen("SV0", "SV0", { show: false }), //

    // ========== OBS DATA ========== //
    id: fieldGen("id", "id", { show: false }), // table id
    INSID: fieldGen("INSID", "Instr. ID", {
      flex: 1,
      minWidth: 100,
      cellClassName: "name-column--cell border-right--cell",
    }), // instrument id
    INSPOS: fieldGen("INSPOS", "Instr. Pos.", {
      felx: 1,
      minWidth: 250,
      renderCell: ({ row }) => {
        return (
          <InstrumentTooltip
            title={row.INSPOS}
            details={
              <>
                <div>
                  <b>Position data:</b> HI: {numFormatter(row.HI, 5)} SHI:{" "}
                  {numFormatter(row.SHI, 2)} ROT3D:{" "}
                  {row.ROT3D ? "true" : "false"}
                </div>
                <div>
                  <b>Rom data:</b> ACST: {numFormatter(row.ACST, 5)} V0:{" "}
                  {numFormatter(row.V0, 5)} SV0: {numFormatter(row.SV0, 1)}
                </div>
              </>
            }
          />
        );
      },
    }), // instrument position
    INSLINE: fieldGen("INSLINE", "ILine", { flex: 0.11, minWidth: 50 }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { flex: 1, minWidth: 150 }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      cellClassName: "border-right--cell",
    }), // target line
    // ========== ANGL ========== //
    OBSANGL: fieldGen("OBSANGL", "Obs. Angle", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // angle observations
    SANGL: fieldGen("SANGL", "S. Ang.", { numDecs: 1 }), // angle standard deviation
    CALCANGL: fieldGen("CALCANGL", "Calc. Angl.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // calculated angle
    RESANGL: fieldGen("RESANGL", "Res. Angl.", { numDecs: 1 }), // angle residual
    RESSIGANGL: fieldGen("RESSIGANGL", "Res./Sig. Angl.", { numDecs: 2 }), // angle RES/SIGMA
    ECARTSANGL: fieldGen("ECARTSANGL", "Ecarts Angl.", {
      numDecs: 2,
      cellClassName: "border-right--cell",
    }), // angle ECARTS
    // ========== ZEND ========== //
    OBSZEND: fieldGen("OBSZEND", "Obs. Zend.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // zenith observations
    SZEND: fieldGen("SZEND", "S. Zend.", { numDecs: 1 }), // zenith standard deviation
    CALCZEND: fieldGen("CALCZEND", "Calc. Zend.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // calculated zenith
    RESZEND: fieldGen("RESZEND", "Res. Zend.", { numDecs: 1 }), // zenith residual
    RESSIGZEND: fieldGen("RESSIGZEND", "Res./Sig. Zend.", { numDecs: 2 }), // zenith RES/SIGMA
    ECARTSZEND: fieldGen("ECARTSZEND", "Ecarts Zend.", {
      numDecs: 2,
      cellClassName: "border-right--cell",
    }), // zenith ECARTS
    // ========== DIST ========== //
    OBSDIST: fieldGen("OBSDIST", "Obs. Dist.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // distance observations
    SDIST: fieldGen("SDIST", "S. Dist.", { numDecs: 1 }), // distance standard deviation
    CALCDIST: fieldGen("CALCDIST", "Calc. Dist.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // calculated distance
    RESDIST: fieldGen("RESDIST", "Res. Dist.", { numDecs: 1 }), // distance residual
    RESSIGDIST: fieldGen("RESSIGDIST", "Res./Sig. Dist.", { numDecs: 2 }), // distance RES/SIGMA
  }; // residuals data
};

const generatefECHOColumns = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    X: fieldGen("X", "X", { show: false }), // reference point x coordinate
    Y: fieldGen("Y", "Y", { show: false }), // reference point y coordinate
    Z: fieldGen("Z", "Z", { show: false }), // reference point z coordinate

    PX: fieldGen("PX", "PX", { show: false }), // reference string x coordinate
    PY: fieldGen("PY", "PY", { show: false }), // reference string y coordinate
    O: fieldGen("O", "O", { show: false }), // reference string orientation
    SO: fieldGen("SO", "SO", { show: false }), // reference string orientation precision
    SN: fieldGen("SN", "SN", { show: false }), // reference string normale precision

    // ========== OBS DATA ========== //
    id: fieldGen("id", "id", { show: false }), // table id
    REFPT: fieldGen("REFPT", "Referenve. Pt.", {
      flex: 1,
      minWidth: 200,
      cellClassName: "name-column--cell border-right--cell",
      renderCell: ({ row }) => {
        return (
          <InstrumentTooltip
            title={row.REFPT}
            details={
              <>
                <div>
                  <b>Ref. point:</b> X (M): {numFormatter(row.X, 5)} Y (M):{" "}
                  {numFormatter(row.Y, 5)} Z (M): {numFormatter(row.Z, 5)}
                </div>
                <div>
                  <b>Wire pars.:</b> Orient. (GON): {numFormatter(row.O, 5)}{" "}
                  SOrient. (CC): {numFormatter(row.SO, 2)} SNormale (MM):{" "}
                  {numFormatter(row.SN, 2)}
                </div>
              </>
            }
          />
        );
      },
    }), // instrument id
    REFLINE: fieldGen("REFLINE", "RLine", { flex: 0.11, minWidth: 50 }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { flex: 1, minWidth: 200 }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", { flex: 0.11, minWidth: 50 }), // target line
    // ========== ECHO DATA ========== //
    OBS: fieldGen("OBS", "Observed", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // observations
    SIGMA: fieldGen("SIGMA", "Sigma", { numDecs: 2 }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // calculated
    RES: fieldGen("RES", "Residual", { numDecs: 1 }), // residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", { numDecs: 2 }), // RES/SIGMA
  }; // residuals data
};

const fTSTNColumnsSelector = (measurement, makeColumns) => {
  // function for obtaining residuals for TSTN measurement type from JSON file
  // ARGS: JSON file
  // OUT: dictionary of residuals with keys: ANGL, DIST, ZEND, TGTPOS, TGTLINE, INSPOS, INSLINE

  const angleConvCC = 63.662 * 10000; // radians to centesimal circle factor
  const angleConvGON = 63.662; // radians to gon factor
  const distConv = 1000; // meters to hundredths of milimeter factor

  let cols = generatefTSTNColumns();
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

const fECHOColumnsSelector = (measurement, makeColumns) => {
  // function for obtaining residuals for TSTN measurement type from JSON file
  // ARGS: JSON file
  // OUT: dictionary of residuals with keys: ANGL, DIST, ZEND, TGTPOS, TGTLINE, INSPOS, INSLINE

  const angleConvCC = 63.662 * 10000; // radians to centesimal circle factor
  const angleConvGON = 63.662; // radians to gon factor
  const distConv = 1000; // meters to hundredths of milimeter factor

  let cols = generatefECHOColumns();
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
      acc["X"].push(
        curr.fMeasuredPlane.fReferencePoint.fEstimatedValue.fVector[0]
      );
      acc["Y"].push(
        curr.fMeasuredPlane.fReferencePoint.fEstimatedValue.fVector[1]
      );
      acc["Z"].push(
        curr.fMeasuredPlane.fReferencePoint.fEstimatedValue.fVector[2]
      );
      acc["PX"].push(
        curr.fMeasuredPlane.fReferencePoint.fEstimatedValue.fVector[0]
      );
      acc["PY"].push(
        curr.fMeasuredPlane.fReferencePoint.fEstimatedValue.fVector[1]
      );
      acc["O"].push(
        angleGONFormatter(curr.fMeasuredPlane.fEstValTheta * angleConvGON)
      );
      acc["SO"].push(curr.fMeasuredPlane.fEstPrecisionTheta * angleConvCC);
      acc["SN"].push(curr.fMeasuredPlane.fEstPrecisionRefPtDist * distConv);

      // == OBS DATA == //
      acc["id"].push(idO++);
      acc["REFPT"].push(curr.fMeasuredPlane.fName);
      acc["REFLINE"].push(curr.line);
      acc["TGTPOS"].push(curr[path[1]][j].targetPos);
      acc["TGTLINE"].push(curr[path[1]][j].line);
      acc["OBS"].push(curr[path[1]][j].distances[0].fValue);
      acc["SIGMA"].push(curr[path[1]][j].target.sigmaCombinedDist * distConv);
      acc["CALC"].push(
        curr[path[1]][j].distances[0].fValue +
          curr[path[1]][j].distancesResiduals[0].fValue
      );
      acc["RES"].push(curr[path[1]][j].distancesResiduals[0].fValue * distConv);
      acc["RESSIG"].push(
        curr[path[1]][j].distancesResiduals[0].fValue /
          curr[path[1]][j].target.sigmaCombinedDist
      );
    }
    return acc;
  }, columns);

  if (makeColumns) {
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
  }

  return obsData;
};

const obsDataSelector = (measurement, type) => {
  switch (type) {
    case "fTSTN":
      return fTSTNColumnsSelector(measurement, true);
    case "fECHO":
      return fECHOColumnsSelector(measurement, true);
    case "fOBSXYZ":
    case "fECWS":
    case "fEDM":
    case "fRADI":
    default:
      return {};
  }
};

// -- main functions -- //
const mergeObsData = (resType, acc, residuals) => {
  if (!(resType in acc)) {
    acc[resType] = residuals;
  } else {
    Object.keys(residuals).forEach((key) => {
      acc[resType][key] = acc[resType][key].concat(residuals[key]);
    });
  }
  return acc;
};

export const getObsData = (data) => {
  return data.tree.reduce((acc, curr) => {
    Object.keys(curr.measurements).forEach((key) => {
      if (key[0] === "f") {
        let obsData = obsDataSelector(curr.measurements, key);
        acc = mergeObsData(key, acc, obsData);
      }
    });
    return acc;
  }, {});
};

const generateObsTSTNColumns = () => {
  return {
    id: fieldGen("id", "id", { show: false }), // table id
    TYPE: fieldGen("TYPE", "Type", { flex: 0.5, minWidth: 50 }),
    TSTN_POS: fieldGen("TSTN_POS", "Station position", {
      flex: 1,
      minWidth: 200,
      cellClassName: "name-column--cell border-right--cell",
    }),
    TSTN_LINE: fieldGen("TSTN_LINE", "Station line"),
    RES_MAX: fieldGen("RES_MAX", "Res. Max.", { numDecs: 2 }),
    RES_MIN: fieldGen("RES_MIN", "Res. Min.", { numDecs: 2 }),
    RES_AVG: fieldGen("RES_AVG", "Res. Avg.", { numDecs: 2 }),
    ECART_TYPE: fieldGen("ECART_TYPE", "Ecart-type", { numDecs: 2 }),
  };
};

const fTSTNObsColumnsSelector = (measurement) => {
  // function for obtaining residuals for TSTN measurement type from JSON file
  // ARGS: JSON file
  // OUT: dictionary of residuals with keys: ANGL, DIST, ZEND, TGTPOS, TGTLINE, INSPOS, INSLINE

  const angleConvCC = 63.662 * 10000; // radians to centesimal circle factor
  const angleConvGON = 63.662; // radians to gon factor
  const distConv = 1000; // meters to hundredths of milimeter factor

  let cols = generateObsTSTNColumns();
  let columns = {};
  Object.keys(cols).forEach((key) => {
    columns[key] = [];
  });
  console.log(cols);

  var idO = 0;
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
          acc["id"].push(idO++);
          acc["TYPE"].push("PLR3D:" + key);
          acc["TSTN_POS"].push(rom.plr3dSummary_[path].fObsText);
          acc["TSTN_LINE"].push(curr.line);
          acc["RES_MAX"].push(rom.plr3dSummary_[path].fResMax);
          acc["RES_MIN"].push(rom.plr3dSummary_[path].fResMin);
          acc["RES_AVG"].push(rom.plr3dSummary_[path].fMean);
          acc["ECART_TYPE"].push(rom.plr3dSummary_[path].fStdev);
        }
      }
    });
    return acc;
  }, columns);

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
};

const smDataSelector = (measurement, type) => {
  switch (type) {
    case "fTSTN":
      return fTSTNObsColumnsSelector(measurement);
    case "fECHO":
    case "fOBSXYZ":
    case "fECWS":
    case "fEDM":
    case "fRADI":
    default:
      return {};
  }
};

// -- main functions -- //
const mergeSmObsData = (resType, acc, residuals) => {
  if (!(resType in acc)) {
    acc[resType] = residuals;
  } else {
    Object.keys(residuals).forEach((key) => {
      acc[resType][key] = acc[resType][key].concat(residuals[key]);
    });
  }
  return acc;
};

export const getSmObsData = (data) => {
  return data.tree.reduce((acc, curr) => {
    Object.keys(curr.measurements).forEach((key) => {
      if (key[0] === "f") {
        let obsData = smDataSelector(curr.measurements, key);
        acc = mergeSmObsData(key, acc, obsData);
      }
    });
    return acc;
  }, {});
};

const generateFrameColumns = () => {
  return {
    id: fieldGen("id", "id", { show: false }), // table id
    TYPE: fieldGen("TYPE", "Type", { flex: 0.5, minWidth: 50 }),
    TSTN_POS: fieldGen("TSTN_POS", "Station position", {
      flex: 1,
      minWidth: 200,
      cellClassName: "name-column--cell border-right--cell",
    }),
    TSTN_LINE: fieldGen("TSTN_LINE", "Station line"),
    RES_MAX: fieldGen("RES_MAX", "Res. Max.", { numDecs: 2 }),
    RES_MIN: fieldGen("RES_MIN", "Res. Min.", { numDecs: 2 }),
    RES_AVG: fieldGen("RES_AVG", "Res. Avg.", { numDecs: 2 }),
    ECART_TYPE: fieldGen("ECART_TYPE", "Ecart-type", { numDecs: 2 }),
  };
};

// const getFrameTree = (data) => {
//   data.tree.reduce((acc, curr) => {
//     curr.frame
