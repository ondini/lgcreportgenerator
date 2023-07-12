import { generateNumFormatter, numFormatter } from "./dataProcessing";
import InstrumentTooltip from "../components/InstrumentTooltip";
import React from "react";
///  --- Table 2 data selection  --- ///

const fieldGen = (field, headerName, args) => {
  let defaultArgs = {
    field: field,
    headerName: headerName,
    flex: 0.5,
    minWidth: 60,
    show: true,
    sortable: true,
  };

  Object.keys(args).forEach((key) => {
    defaultArgs[key] = args[key];
  });

  return defaultArgs;
};

// -- selectors -- //

const generatefTSTNColumns = () => {
  return {
    // ======== TOOLTIP DATA ======== //
    HI: fieldGen("HI", "HI", { show: false }), // instrument height
    SHI: fieldGen("SHI", "SHI", { show: false }), // instrument height precision
    ROT3D: fieldGen("ROT3D", "ROT3D", { show: false }), //
    ACST: fieldGen("ACST", "ACST", { show: false }), //
    V0: fieldGen("V0", "V0", { show: false }), //
    SV0: fieldGen("SV0", "SV0", { show: false }), //

    // ======== OBS DATA ========== //
    id: fieldGen("id", "id", { flex: 0.1, minWidth: 30 }), // table id
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
    // ======== ANGL================ //
    OBSANGL: fieldGen("OBSANGL", "Obs. Angle", {
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }), // angle observations
    SANGL: fieldGen("SANGL", "S. Ang.", {
      valueFormatter: generateNumFormatter(1, 1),
    }), // angle standard deviation
    CALCANGL: fieldGen("CALCANGL", "Calc. Angl.", {
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }), // calculated angle
    RESANGL: fieldGen("RESANGL", "Res. Angl.", {
      valueFormatter: generateNumFormatter(1, 1),
    }), // angle residual
    RESSIGANGL: fieldGen("RESSIGANGL", "Res./Sig. Angl.", {
      valueFormatter: generateNumFormatter(2, 1),
    }), // angle RES/SIGMA
    ECARTSANGL: fieldGen("ECARTSANGL", "Ecarts Angl.", {
      valueFormatter: generateNumFormatter(2, 1),
      cellClassName: "border-right--cell",
    }), // angle ECARTS
    // ======== ZEND ======== //
    OBSZEND: fieldGen("OBSZEND", "Obs. Zend.", {
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }), // zenith observations
    SZEND: fieldGen("SZEND", "S. Zend.", {
      valueFormatter: generateNumFormatter(1, 1),
    }), // zenith standard deviation
    CALCZEND: fieldGen("CALCZEND", "Calc. Zend.", {
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }), // calculated zenith
    RESZEND: fieldGen("RESZEND", "Res. Zend.", {
      valueFormatter: generateNumFormatter(1, 1),
    }), // zenith residual
    RESSIGZEND: fieldGen("RESSIGZEND", "Res./Sig. Zend.", {
      valueFormatter: generateNumFormatter(2, 1),
    }), // zenith RES/SIGMA
    ECARTSZEND: fieldGen("ECARTSZEND", "Ecarts Zend.", {
      valueFormatter: generateNumFormatter(2, 1),
      cellClassName: "border-right--cell",
    }), // zenith ECARTS
    // ======== DIST ======== //
    OBSDIST: fieldGen("OBSDIST", "Obs. Dist.", {
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }), // distance observations
    SDIST: fieldGen("SDIST", "S. Dist.", {
      valueFormatter: generateNumFormatter(1, 1),
    }), // distance standard deviation
    CALCDIST: fieldGen("CALCDIST", "Calc. Dist.", {
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }), // calculated distance
    RESDIST: fieldGen("RESDIST", "Res. Dist.", {
      valueFormatter: generateNumFormatter(1, 1),
    }), // distance residual
    RESSIGDIST: fieldGen("RESSIGDIST", "Res./Sig. Dist.", {
      valueFormatter: generateNumFormatter(2, 1),
    }), // distance RES/SIGMA
  }; // residuals data
};

const generatefECHOColumns = () => {
  return {
    // == TOOLTIP DATA == //
    // X: {
    //   data: [],
    //   show: false,
    // },
    // Y: {
    //   data: [],
    //   show: false,
    // },
    // Z: {
    //   data: [],
    //   show: false,
    // },

    // == OBS DATA == //
    id: {
      field: "id",
      data: [],
      show: false,
      headerName: "id",
      sortable: true,
      flex: 0.1,
      minWidth: 30,
    }, // table id
    REFPT: {
      field: "REFPT",
      data: [],
      show: true,
      headerName: "Reference. Pt.",
      sortable: true,
      flex: 1,
      minWidth: 200,
      cellClassName: "name-column--cell border-right--cell",
      renderCell: ({ row: { REFPT, X, Y, Z } }) => {
        return (
          <InstrumentTooltip
            title={REFPT}
            details={
              <>
                <h5>Ref point data</h5>
                <div>X: 0 Y: 0 Z: false</div>.
              </>
            }
          />
        );
      },
    }, // instrument id
    REFLINE: {
      field: "REFLINE",
      data: [],
      show: true,
      headerName: "RLine",
      sortable: true,
      flex: 0.11,
      minWidth: 50,
    }, // instrument line
    TGTPOS: {
      field: "TGTPOS",
      data: [],
      show: true,
      headerName: "Tgt. Pos.",
      sortable: true,
      flex: 1,
      minWidth: 200,
    }, // target position
    TGTLINE: {
      field: "TGTLINE",
      data: [],
      show: true,
      headerName: "TLine",
      sortable: true,
      flex: 0.11,
      minWidth: 50,
      cellClassName: "border-right--cell",
    }, // target line
    // == ANGL == //
    OBSERVE: {
      field: "OBSERVE",
      data: [],
      show: true,
      headerName: "Observed",
      sortable: true,
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }, // angle observations
    SIGMA: {
      field: "SIGMA",
      data: [],
      show: true,
      headerName: "Sigma",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
    }, // angle standard deviation
    CALC: {
      field: "CALC",
      data: [],
      show: true,
      headerName: "Calculated",
      sortable: true,
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }, // angle calculated // measured+ residual
    RES: {
      field: "RES",
      data: [],
      show: true,
      headerName: "Residual",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
    }, // angle residuals
    RESSIG: {
      field: "RESSIG",
      data: [],
      show: true,
      headerName: "Res./Sig.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
    }, // angle RES/SIGMA
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
      // == OBS DATA == //
      acc["id"].push(idO++);
      acc["REFPT"].push(curr.fMeasuredPlane.fName);
      acc["REFLINE"].push(curr.line);
      acc["TGTPOS"].push(curr[path[1]][j].targetPos);
      acc["TGTLINE"].push(curr[path[1]][j].line);
      acc["OBSERVE"].push(curr[path[1]][j].distances[0].fValue);
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
