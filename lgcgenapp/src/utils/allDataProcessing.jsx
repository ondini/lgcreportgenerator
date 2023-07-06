import { generateNumFormatter } from "./dataProcessing";

///  --- Table 2 data selection  --- ///

// -- selectors -- //

const generatefTSTNColumns = () => {
  return {
    // == TOOLTIP DATA == //
    INSHI: {
      field: "INSHI",
      data: [],
      show: false,
      headerName: "id",
      sortable: true,
      flex: 0.1,
      minWidth: 30,
    }, // instrument height
    // == OBS DATA == //
    id: {
      field: "id",
      data: [],
      show: true,
      headerName: "id",
      sortable: true,
      flex: 0.1,
      minWidth: 30,
    }, // table id
    INSID: {
      field: "INSID",
      data: [],
      show: true,
      headerName: "Instr. ID",
      sortable: true,
      flex: 1,
      minWidth: 200,
      cellClassName: "name-column--cell border-right--cell",
    }, // instrument id
    INSPOS: {
      field: "INSPOS",
      data: [],
      show: true,
      headerName: "Instr. Pos.",
      sortable: true,
      flex: 1,
      minWidth: 200,
    }, // instrument position
    INSLINE: {
      field: "INSLINE",
      data: [],
      show: true,
      headerName: "ILine",
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
    OBSANGL: {
      field: "OBSANGL",
      data: [],
      show: true,
      headerName: "Obs. Angle",
      sortable: true,
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }, // angle observations
    SANGL: {
      field: "SANGL",
      data: [],
      show: true,
      headerName: "S. Ang.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(1, 1),
    }, // angle standard deviation
    CALCANGL: {
      field: "CALCANGL",
      data: [],
      show: true,
      headerName: "Calc. Angl.",
      sortable: true,
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }, // angle calculated // measured+ residual
    RESANGL: {
      field: "RESANGL",
      data: [],
      show: true,
      headerName: "Res. Ang.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(1, 1),
    }, // angle residuals
    RESSIGANGL: {
      field: "RESSIGANGL",
      data: [],
      show: true,
      headerName: "Res./Sig. Ang.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
    }, // angle RES/SIGMA
    ECARTSANGL: {
      field: "ECARTSANGL",
      data: [],
      show: true,
      headerName: "Ecarts Angl.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
      cellClassName: "border-right--cell",
    },
    // == ZEND == //
    OBSZEND: {
      field: "OBSZEND",
      data: [],
      show: true,
      headerName: "Obs. Zend.",
      sortable: true,
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }, // zenith observations
    SZEND: {
      field: "SZEND",
      data: [],
      show: true,
      headerName: "S. Zend.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(1, 1),
    }, // zenith standard deviation
    CALCZEND: {
      field: "CALCZEND",
      data: [],
      show: true,
      headerName: "Calc. Zend.",
      sortable: true,
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }, // zenith calculated // measured+ residual
    RESZEND: {
      field: "RESZEND",
      data: [],
      show: true,
      headerName: "Res. Zend",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(1, 1),
    }, // zenith residuals
    RESSIGZEND: {
      field: "RESSIGZEND",
      data: [],
      show: true,
      headerName: "Res./Sig. Zend.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
    }, // zenith RES/SIGMA
    ECARTSZEND: {
      field: "ECARTSZEND",
      data: [],
      show: true,
      headerName: "Ecarts Zend.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
      cellClassName: "border-right--cell",
    },
    // == DIST == //
    OBSDIST: {
      field: "OBSDIST",
      data: [],
      show: true,
      headerName: "Obs. Dist.",
      sortable: true,
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }, // distance observations
    SDIST: {
      field: "SDIST",
      data: [],
      show: true,
      headerName: "S. Dist.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
    }, // distance standard deviation
    CALCDIST: {
      field: "CALCDIST",
      data: [],
      show: true,
      headerName: "Calc. Dist.",
      sortable: true,
      flex: 0.8,
      minWidth: 100,
      valueFormatter: generateNumFormatter(5, 1),
    }, // distance calculated // measured+ residual
    RESDIST: {
      field: "RESDIST",
      data: [],
      show: true,
      headerName: "Dist. Res.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
    }, // distance residuals
    RESSIGDIST: {
      field: "RESSIGDIST",
      data: [],
      show: true,
      headerName: "Dist. Res./Sig.",
      sortable: true,
      flex: 0.5,
      minWidth: 60,
      valueFormatter: generateNumFormatter(2, 1),
    }, // distance RES/SIGMA
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
    console.log(key);
  });

  var idO = 0;
  let obsData = measurement.fTSTN.reduce((acc, curr) => {
    // reduce over all measurements
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i]; // current rom
      if ("measPLR3D" in rom) {
        for (let j = 0; j < rom.measPLR3D.length; j++) {
          // == TOOLTIP DATA == //
          acc["id"].push(idO++);
          // == OBS DATA == //
          acc["INSPOS"].push(curr.instrumentPos);
          acc["INSLINE"].push(curr.line);
          acc["INSID"].push(curr.instrument.ID);
          acc["INSHI"].push(curr.instrumentHeightAdjustable.fEstimatedValue);
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
    for (let i = 0; i < colNames.length; i++) {
      if (cols[colNames[i]].show) {
        columnDetails.push(cols[colNames[i]]);
      }
    }

    // convert array of values to dictionary with keys from colNames, so thtat this can be used in a table
    obsData = obsData[colNames[0]].map((value, index) => {
      return colNames.reduce((acc, key) => {
        acc[key] = obsData[key][index];
        return acc;
      }, {});
    });
    return { data: obsData, columnss: columnDetails };
  }

  return obsData;
};

const obsDataSelector = (measurement, type) => {
  switch (type) {
    case "fTSTN":
      return fTSTNColumnsSelector(measurement, true);
    case "fOBSXYZ":
    case "fECWS":
    case "fEDM":
    case "fECHO":
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
