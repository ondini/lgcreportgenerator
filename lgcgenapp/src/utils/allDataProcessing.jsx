import { generateNumFormatter } from "./dataProcessing";

///  --- Table 2 data selection  --- ///

// -- selectors -- //

const fTSTNColumnsSelector = (measurement, makeColumns) => {
  // function for obtaining residuals for TSTN measurement type from JSON file
  // ARGS: JSON file
  // OUT: dictionary of residuals with keys: ANGL, DIST, ZEND, TGTPOS, TGTLINE, INSPOS, INSLINE

  const angleConv = 63.662 * 10000; // radians to centesimal circle factor
  const distConv = 100000; // meters to hundredths of milimeter factor

  let columns = {
    // == TOOLTIP DATA == //

    // == OBS DATA == //
    id: [], // station name
    INSPOS: [], // instrument position
    INSLINE: [], // instrument line
    INSID: [], // instrument id
    INSHI: [], // instrument height
    TGTPOS: [], // target position
    TGTLINE: [], // target line
    // == ANGL == //
    OBSANGL: [], // angle observations
    SANGL: [], // angle standard deviation
    CALCANGL: [], // angle calculated // measured+ residual
    RESANGL: [], // angle residuals
    RESSIGANGL: [], // angle RES/SIGMA
    ECARTSANGL: [],
    // == ZEND == //
    OBSZEND: [], // zenith observations
    SZEND: [], // zenith standard deviation
    CALCZEND: [], // zenith calculated // measured+ residual
    RESZEND: [], // zenith residuals
    RESSIGZEND: [], // zenith RES/SIGMA
    ECARTSZEND: [],
    // == DIST == //
    OBSDIST: [], // distance observations
    SDIST: [], // distance standard deviation
    CALCDIST: [], // distance calculated // measured+ residual
    RESDIST: [], // distance residuals
    RESSIGDIST: [], // distance RES/SIGMA
  }; // residuals data

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
          acc["OBSANGL"].push(rom.measPLR3D[j].angles[0].fValue * angleConv);
          acc["SANGL"].push(rom.measPLR3D[j].target.sigmaCombinedPLRAngl);
          acc["CALCANGL"].push(
            (rom.measPLR3D[j].angles[0].fValue +
              rom.measPLR3D[j].anglesResiduals[0].fValue) *
              angleConv
          );
          acc["RESANGL"].push(
            rom.measPLR3D[j].anglesResiduals[0].fValue * angleConv
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
          acc["OBSZEND"].push(rom.measPLR3D[j].angles[1].fValue * angleConv);
          acc["SZEND"].push(rom.measPLR3D[j].target.sigmaCombinedPLRZenD);
          acc["CALCZEND"].push(
            (rom.measPLR3D[j].angles[1].fValue +
              rom.measPLR3D[j].anglesResiduals[1].fValue) *
              angleConv
          );
          acc["RESZEND"].push(
            rom.measPLR3D[j].anglesResiduals[1].fValue * angleConv
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
          acc["OBSDIST"].push(rom.measPLR3D[j].distances[0].fValue * distConv);
          acc["SDIST"].push(rom.measPLR3D[j].target.sigmaCombinedPLRDist);
          acc["CALCDIST"].push(
            (rom.measPLR3D[j].distances[0].fValue +
              rom.measPLR3D[j].distancesResiduals[0].fValue) *
              distConv
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
    let colNames = Object.keys(columns);
    let columnDetails = colNames.map((key) => {
      return {
        field: key,
        headerName: key,
        sortable: true,
        flex: 1,
        // valueFormatter: generateNumFormatter(2, 1000),
      };
    });

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
