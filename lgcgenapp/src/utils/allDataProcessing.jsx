///  --- Table 2 data selection  --- ///

// -- selectors -- //

const fTSTNResidualsSelector = (measurement) => {
  // function for obtaining residuals for TSTN measurement type from JSON file
  // ARGS: JSON file
  // OUT: dictionary of residuals with keys: ANGL, DIST, ZEND, TGTPOS, TGTLINE, INSPOS, INSLINE

  const angleConv = 63.662 * 10000; // radians to centesimal circle factor
  const distConv = 100000; // meters to hundredths of milimeter factor

  let columns = {
    // == OBS DATA == //
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

  residuals = measurement.fTSTN.reduce((acc, curr) => {
    // reduce over all measurements
    for (let i = 0; i < curr.roms.length; i++) {
      let rom = curr.roms[i]; // current rom
      if ("measPLR3D" in rom) {
        for (let j = 0; j < rom[residualsKeys[0]].length; j++) {
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
          acc["SZEND"].push(rom.measPLR3D[j].target.sigmaCombinedPLRZend);
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
              rom.measPLR3D[j].target.sigmaCombinedPLRZend
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
  return residuals;
};
