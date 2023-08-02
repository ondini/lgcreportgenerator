import InstrumentTooltip from "../../components/InstrumentTooltip";
import { angleRad2CCf, angleRad2GONf, distM2HMMf, distM2MMf, angleRad2GONPosf } from "../../data/constants";

import { numFormatter, fieldGen, linkPathPlaceholder } from "./colUtils";

// =======================================================
// ============= OBSERVATIONS TABLE COLUMNS ==============
// =======================================================

// ============================================= //
// ========== POLAR TYPE COLUMNS =============== //
// ============================================= //

// ========== TSTN OBS. TABLE COLUMNS ========== //
export const generateTSTNObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    HI: fieldGen("HI", "HI", {
      show: false,
      path: "instrumentHeightAdjustable/fEstimatedValue",
    }), // instrument height
    SHI: fieldGen("SHI", "SHI", {
      show: false,
      path: "instrumentHeightAdjustable/fEstimatedPrecision",
    }), // instrument height precision
    ROT3D: fieldGen("ROT3D", "ROT3D", { show: false, path: "rot3D" }), //
    ACST: fieldGen("ACST", "ACST", { show: false, path: "roms/i/acst" }), //
    V0: fieldGen("V0", "V0", {
      show: false,
      path: "roms/i/v0/fEstimatedValue",
      unitConv: angleRad2GONf,
    }), //
    SV0: fieldGen("SV0", "SV0", {
      show: false,
      path: "roms/i/v0/fEstimatedPrecision",
      unitConv: angleRad2CCf,
    }), //

    // ========== OBS DATA ========== //
    INSID: fieldGen("INSID", "Instr. ID", {
      flex: 1,
      minWidth: 100,
      cellClassName: "name-column--cell border-right--cell",
      path: "instrument/ID",
    }), // instrument id
    INSPOS: fieldGen("INSPOS", "Instr. Pos.", {
      felx: 1,
      minWidth: 250,
      path: "instrumentPos",
      renderCell: ({ row }) => {
        return (
          <InstrumentTooltip
            title={row.INSPOS}
            details={
              <>
                <div>
                  <b>Position data:</b> HI: {numFormatter(row.HI, 5)} SHI: {numFormatter(row.SHI, 2)} ROT3D:{" "}
                  {row.ROT3D ? "true" : "false"}
                </div>
                <div>
                  <b>Rom data:</b> ACST: {numFormatter(row.ACST, 5)} V0: {numFormatter(row.V0, 5)} SV0:{" "}
                  {numFormatter(row.SV0, 1)}
                </div>
              </>
            }
          />
        );
      },
    }), // instrument position
    INSLINE: fieldGen("INSLINE", "ILine", {
      flex: 0.11,
      minWidth: 50,
      path: "line",
      renderCell: ({ row: { INSLINE } }) => {
        return <a href={`surveypad://link//${linkPathPlaceholder},${INSLINE}`}>{INSLINE}</a>;
      },
    }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      flex: 1,
      minWidth: 150,
      path: "roms/i/measPLR3D/i/targetPos",
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      cellClassName: "border-right--cell",
      path: "roms/i/measPLR3D/i/line",
      renderCell: ({ row: { TGTLINE } }) => {
        return <a href={`surveypad://link//${linkPathPlaceholder},${TGTLINE}`}>{TGTLINE}</a>;
      },
    }), // target line

    // ========== ANGL ========== //
    OBSANGL: fieldGen("OBSANGL", "Obs. Angle", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "roms/i/measPLR3D/i/angles/0/fValue",
      unitConv: angleRad2GONf,
    }), // angle observations
    SANGL: fieldGen("SANGL", "S. Ang.", {
      numDecs: 1,
      path: "roms/i/measPLR3D/i/target/sigmaCombinedPLRAngl",
      unitConv: angleRad2CCf,
    }), // angle standard deviation
    CALCANGL: fieldGen("CALCANGL", "Calc. Angl.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "!roms/i/measPLR3D/i/angles/0/fValue!+!roms/i/measPLR3D/i/anglesResiduals/0/fValue!",
      unitConv: angleRad2GONf,
    }), // calculated angle
    RESANGL: fieldGen("RESANGL", "Res. Angl.", {
      numDecs: 1,
      path: "roms/i/measPLR3D/i/anglesResiduals/0/fValue",
    }), // angle residual
    RESSIGANGL: fieldGen("RESSIGANGL", "Res./Sig. Angl.", {
      numDecs: 2,
      path: "!roms/i/measPLR3D/i/anglesResiduals/0/fValue!/!roms/i/measPLR3D/i/target/sigmaCombinedPLRAngl!",
    }), // angle RES/SIGMA
    ECARTSANGL: fieldGen("ECARTSANGL", "Ecarts Angl.", {
      numDecs: 2,
      cellClassName: "border-right--cell",
      path: "!roms/i/measPLR3D/i/distances/0/fValue!*!roms/i/measPLR3D/i/anglesResiduals/0/fValue!",
      unitConv: distM2MMf,
    }), // angle ECARTS

    // ========== ZEND ========== //
    OBSZEND: fieldGen("OBSZEND", "Obs. Zend.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "roms/i/measPLR3D/i/angles/1/fValue",
      unitConv: angleRad2GONf,
    }), // zenith observations
    SZEND: fieldGen("SZEND", "S. Zend.", {
      numDecs: 1,
      path: "roms/i/measPLR3D/i/target/sigmaCombinedPLRZenD",
      unitConv: angleRad2CCf,
    }), // zenith standard deviation
    CALCZEND: fieldGen("CALCZEND", "Calc. Zend.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "!roms/i/measPLR3D/i/angles/1/fValue!+!roms/i/measPLR3D/i/anglesResiduals/1/fValue!",
      unitConv: angleRad2GONf,
    }), // calculated zenith
    RESZEND: fieldGen("RESZEND", "Res. Zend.", {
      numDecs: 1,
      path: "roms/i/measPLR3D/i/anglesResiduals/1/fValue",
      unitConv: angleRad2CCf,
    }), // zenith residual
    RESSIGZEND: fieldGen("RESSIGZEND", "Res./Sig. Zend.", {
      numDecs: 2,
      path: "!roms/i/measPLR3D/i/anglesResiduals/1/fValue!/!roms/i/measPLR3D/i/target/sigmaCombinedPLRZenD!",
    }), // zenith RES/SIGMA
    ECARTSZEND: fieldGen("ECARTSZEND", "Ecarts Zend.", {
      numDecs: 2,
      cellClassName: "border-right--cell",
      path: "!roms/i/measPLR3D/i/distances/0/fValue!*!roms/i/measPLR3D/i/anglesResiduals/1/fValue!",
      unitConv: distM2MMf,
    }), // zenith ECARTS

    // ========== DIST ========== //
    OBSDIST: fieldGen("OBSDIST", "Obs. Dist.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "roms/i/measPLR3D/i/distances/0/fValue",
    }), // distance observations
    SDIST: fieldGen("SDIST", "S. Dist.", {
      numDecs: 1,
      path: "roms/i/measPLR3D/i/target/sigmaCombinedPLRDist",
      unitConv: distM2MMf,
    }), // distance standard deviation
    CALCDIST: fieldGen("CALCDIST", "Calc. Dist.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "!roms/i/measPLR3D/i/distances/0/fValue!+!roms/i/measPLR3D/i/distancesResiduals/0/fValue!",
    }), // calculated distance
    RESDIST: fieldGen("RESDIST", "Res. Dist.", {
      numDecs: 1,
      path: "roms/i/measPLR3D/i/distancesResiduals/0/fValue",
      unitConv: distM2MMf,
    }), // distance residual
    RESSIGDIST: fieldGen("RESSIGDIST", "Res./Sig. Dist.", {
      numDecs: 2,
      path: "!roms/i/measPLR3D/i/distancesResiduals/0/fValue!/!roms/i/measPLR3D/i/target/sigmaCombinedPLRDist!",
    }), // distance RES/SIGMA
  }; // residuals data
};

// =========== ORI OBS. TABLE COLUMNS ========== //
export const generateORIEObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    INSPOS: fieldGen("INSPOS", "Station", {
      flex: 1,
      minWidth: 200,
      path: "instrumentPos",
      cellClassName: "name-column--cell border-right--cell",
    }), // instrument id
    INSLINE: fieldGen("INSLINE", "RLine", {
      flex: 0.11,
      minWidth: 50,
      path: "line",
    }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Point", {
      flex: 1,
      minWidth: 200,
      path: "measORIE/i/targetPos",
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      path: "measORIE/i/line",
    }), // target line
    OBS: fieldGen("OBS", "Observed", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "measORIE/i/angles/0/fValue",
    }), // observations
    SIGMA: fieldGen("SIGMA", "Sigma", {
      numDecs: 2,
      path: "measORIE/i/target/sigmaCombinedAngle",
      unitConv: distM2MMf,
    }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "!measORIE/i/angles/0/fValue!+!measORIE/i/anglesResiduals/0/fValue!",
    }), // calculated
    RES: fieldGen("RES", "Residual", {
      numDecs: 1,
      path: "measORIE/i/anglesResiduals/0/fValue",
      unitConv: distM2MMf,
    }), // residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      numDecs: 2,
      path: "!measORIE/i/anglesResiduals/0/fValue!/!measORIE/i/target/sigmaCombinedAngle!",
    }), // RES/SIGMA
    TRGT: fieldGen("TRGT", "Target", {
      flex: 1,
      minWidth: 200,
      path: "measORIE/i/target/ID",
    }), // target
    OBSE: fieldGen("OBSE", "Observed", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "measORIE/i/target/sigmaAngl",
    }), // observations
    TCSE: fieldGen("TCSE", "Tgt. centering Sig.", {
      numDecs: 2,
      path: "measORIE/i/target/sigmaTargetCentering",
      unitConv: distM2MMf,
    }), // standard deviation
  }; // residuals data
};

// ============================================= //
// ============ CAMD TYPE COLUMNS =============== //
// ============================================= //

// ============================================= //
// ============ EDM TYPE COLUMNS =============== //
// ============================================= //

// ========== DSPT OBS. TABLE COLUMNS ========== //
export const generateDSPTObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    HI: fieldGen("HI", "HINSTR", {
      show: false,
      path: "instrument/instrHeight",
    }), // instrument height

    // ========== OBS DATA ========== //
    INSID: fieldGen("INSID", "Instrument", {
      flex: 1,
      minWidth: 100,
      cellClassName: "name-column--cell border-right--cell",
      path: "instrument/ID",
    }), // instrument id
    INSPOS: fieldGen("INSPOS", "Instr. Pos.", {
      felx: 1,
      minWidth: 250,
      path: "instrumentPos",
      renderCell: ({ row }) => {
        return (
          <InstrumentTooltip
            title={row.INSPOS}
            details={
              <div>
                <b>Position data:</b> HINSTR: {numFormatter(row.HI, 5)}
              </div>
            }
          />
        );
      },
    }), // instrument position
    INSLINE: fieldGen("INSLINE", "ILine", {
      flex: 0.11,
      minWidth: 50,
      path: "line",
      renderCell: ({ row: { INSLINE } }) => {
        return <a href={`surveypad://link//${linkPathPlaceholder},${INSLINE}`}>{INSLINE}</a>;
      },
    }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Point", {
      flex: 1,
      minWidth: 150,
      path: "measDSPT/i/targetPos",
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      path: "measDSPT/i/line",
      renderCell: ({ row: { TGTLINE } }) => {
        return <a href={`surveypad://link//${linkPathPlaceholder},${TGTLINE}`}>{TGTLINE}</a>;
      },
    }), // target line

    // ========== DSPT ========== //
    OBS: fieldGen("OBS", "Observed", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "measDSPT/i/distances/0/fValue",
    }), // angle observations
    SIG: fieldGen("SIG", "Sigma", {
      numDecs: 2,
      path: "measDSPT/i/target/sigmaCombinedDist",
      unitConv: distM2MMf,
    }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "!measDSPT/i/distances/0/fValue!+!measDSPT/i/distancesResiduals/0/fValue",
    }), // calculated dist
    RES: fieldGen("RES", "Residual", {
      numDecs: 2,
      path: "measDSPT/i/distancesResiduals/0/fValue",
      unitConv: distM2MMf,
    }), // dist residual
    // SENSI: fieldGen("SENSI", "Sensitivity", {
    //   numDecs: 2,
    //   path: "measDSPT/i/distancesResiduals/0/fValue",
    //   unitConv: distM2MMf,
    // }), //
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      numDecs: 2,
      path: "!measDSPT/i/distancesResiduals/0/fValue!/!measDSPT/i/target/sigmaCombinedDist!",
    }), // RES/SIGMA
    CONST: fieldGen("CONST", "Constant", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "measDSPT/i/target/distCorrectionValue",
    }), //
    SCONST: fieldGen("SCONST", "S. Cons.", {
      numDecs: 1,
      path: "measDSPT/i/target/sigmaDCorr",
      unitConv: angleRad2CCf,
      cellClassName: "border-right--cell",
    }), // zenith standard deviation
    SCONSTFIX: fieldGen("SCONST", "S. Cons.", {
      numDecs: 1,
      path: "measDSPT/i/target/distCorrectionUnknown",
      unitConv: angleRad2CCf,
      cellClassName: "border-right--cell",
    }), // zenith standard deviation

    // ========== TGT ========== //
    TGTID: fieldGen("TGTID", "Tgt. Pos.", {
      flex: 1,
      minWidth: 150,
      path: "measDSPT/i/target/ID",
    }), // target instr ID
    TGTIDLINE: fieldGen("TGTIDLINE", "Tgt. Line.", {
      flex: 1,
      minWidth: 150,
      path: "measDSPT/i/target/line",
    }), // target instr ID
    HTGT: fieldGen("HTGT", "Tgt. height", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measDSPT/i/target/targetHt",
    }), // target height
    OBSE: fieldGen("OBSE", "Tgt. observed", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measDSPT/i/target/sigmaDSpt",
    }), // target
    PPM: fieldGen("PPM", "Tgt. observed", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measDSPT/i/target/ppmDSpt",
    }), // target
    TCSE: fieldGen("TCSE", "Tgt. centering Sig.", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measDSPT/i/target/sigmaTargetCentering",
    }), // target
    THSE: fieldGen("THSE", "Tgt. height. Sig", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measDSPT/i/target/sigmaTargetHt",
    }), // target
  }; // residuals data
};

// ============================================= //
// =========== LEVEL TYPE COLUMNS ============== //
// ============================================= //

// ============================================= //
// =========== SCALE TYPE COLUMNS ============== //
// ============================================= //

// ========== ECHO OBS. TABLE COLUMNS ========== //
export const generateECHOObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    X: fieldGen("X", "X", {
      show: false,
      path: "fMeasuredPlane/fReferencePoint/fEstimatedValueInRoot/fVector/0",
    }), // reference point x coordinate
    Y: fieldGen("Y", "Y", {
      show: false,
      path: "fMeasuredPlane/fReferencePoint/fEstimatedValueInRoot/fVector/1",
    }), // reference point y coordinate
    Z: fieldGen("Z", "Z", {
      show: false,
      path: "fMeasuredPlane/fReferencePoint/fEstimatedValueInRoot/fVector/2",
    }), // reference point z coordinate
    PX: fieldGen("PX", "PX", {
      show: false,
      path: "fMeasuredPlane/fReferencePoint/fEstimatedValueInRoot/fVector/0",
    }), // reference string x coordinate
    PY: fieldGen("PY", "PY", {
      show: false,
      path: "fMeasuredPlane/fReferencePoint/fEstimatedValueInRoot/fVector/0",
    }), // reference string y coordinate
    O: fieldGen("O", "O", {
      show: false,
      path: "fMeasuredPlane/fEstValTheta",
      unitConv: angleRad2GONPosf,
    }), // reference string orientation
    SO: fieldGen("SO", "SO", {
      show: false,
      path: "fMeasuredPlane/fEstPrecisionTheta",
      unitConv: angleRad2CCf,
    }), // reference string orientation precision
    SN: fieldGen("SN", "SN", {
      show: false,
      path: "fMeasuredPlane/fEstPrecisionRefPtDist",
      unitConv: distM2MMf,
    }), // reference string normale precision

    // ========== OBS DATA ========== //
    INSPOS: fieldGen("INSPOS", "Reference. Pt.", {
      flex: 1,
      minWidth: 200,
      path: "fMeasuredPlane/fName",
      cellClassName: "name-column--cell border-right--cell",
      renderCell: ({ row }) => {
        return (
          <InstrumentTooltip
            title={row.INSPOS}
            details={
              <>
                <div>
                  <b>Ref. point:</b> X (M): {numFormatter(row.X, 5)} Y (M): {numFormatter(row.Y, 5)} Z (M):{" "}
                  {numFormatter(row.Z, 5)}
                </div>
                <div>
                  <b>Wire pars.:</b> Orient. (GON): {numFormatter(row.O, 5)} SOrient. (CC): {numFormatter(row.SO, 2)}{" "}
                  SNormale (MM): {numFormatter(row.SN, 2)}
                </div>
              </>
            }
          />
        );
      },
    }), // instrument id
    INSLINE: fieldGen("INSLINE", "RLine", {
      flex: 0.11,
      minWidth: 50,
      path: "line",
    }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      flex: 1,
      minWidth: 200,
      path: "measECHO/i/targetPos",
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      path: "measECHO/i/line",
    }), // target line

    // ========== ECHO DATA ========== //
    OBS: fieldGen("OBS", "Observed", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "measECHO/i/distances/0/fValue",
    }), // observations
    SIGMA: fieldGen("SIGMA", "Sigma", {
      numDecs: 2,
      path: "measECHO/i/target/sigmaCombinedDist",
      unitConv: distM2MMf,
    }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "!measECHO/i/distances/0/fValue!+!measECHO/i/distancesResiduals/0/fValue!",
    }), // calculated
    RES: fieldGen("RES", "Residual", {
      numDecs: 1,
      path: "measECHO/i/distancesResiduals/0/fValue",
      unitConv: distM2MMf,
    }), // residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      numDecs: 2,
      path: "!measECHO/i/distancesResiduals/0/fValue!/!measECHO/i/target/sigmaCombinedDist!",
    }), // RES/SIGMA
  }; // residuals data
};

// ============================================= //
// ============ INCL TYPE COLUMNS ============== //
// ============================================= //

// ============================================= //
// ============ HLSR TYPE COLUMNS ============== //
// ============================================= //

// ========== ECWS OBS. TABLE COLUMNS ========== //
export const generateECWSObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    HI: fieldGen("HI", "Surface Height", {
      show: false,
      path: "fMeasuredWSHeight/fEstimatedValue",
    }), // instrument height
    PREC: fieldGen("PREC", "Surface Prec.", {
      show: false,
      path: "fMeasuredWSHeight/fEstimatedPrecision",
    }), // instrument height

    // ========== OBS DATA ========== //
    INSPOS: fieldGen("INSPOS", "Instr. Pos.", {
      felx: 1,
      minWidth: 250,
      path: "fMeasuredWSHeight/fName", //// ASK
      renderCell: ({ row }) => {
        return (
          <InstrumentTooltip
            title={row.INSPOS}
            details={
              <div>
                <b>Position data:</b> HINSTR: {numFormatter(row.HI, 5)}
              </div>
            }
          />
        );
      },
    }), // instrument position
    INSLINE: fieldGen("INSLINE", "ILine", {
      flex: 0.11,
      minWidth: 50,
      path: "line",
      renderCell: ({ row: { INSLINE } }) => {
        return <a href={`surveypad://link//${linkPathPlaceholder},${INSLINE}`}>{INSLINE}</a>;
      },
    }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      flex: 1,
      minWidth: 150,
      path: "measECWS/i/targetPos",
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      path: "measECWS/i/line",
      renderCell: ({ row: { TGTLINE } }) => {
        return <a href={`surveypad://link//${linkPathPlaceholder},${TGTLINE}`}>{TGTLINE}</a>;
      },
    }), // target line

    // ========== DSPT ========== //
    OBS: fieldGen("OBS", "Observed", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "measECWS/i/distances/0/fValue",
    }), // angle observations
    SIG: fieldGen("SIG", "Sigma", {
      numDecs: 2,
      path: "measECWS/i/target/sigmaCombinedDist",
      unitConv: distM2MMf,
    }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "!measECWS/i/distances/0/fValue!+!measECWS/i/distancesResiduals/0/fValue",
    }), // calculated angle
    RES: fieldGen("RES", "Residual", {
      numDecs: 2,
      path: "measECWS/i/distancesResiduals/0/fValue",
      unitConv: distM2MMf,
    }), // angle residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      numDecs: 2,
      path: "!measECWS/i/distancesResiduals/0/fValue!/!measECWS/i/target/sigmaCombinedDist!",
    }), // angle RES/SIGMA
    OBSE: fieldGen("OBSE", "Observ. Sig.", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWS/i/target/sigmaDist",
    }), // target line
    IHSE: fieldGen("IHSE", "Inst. Heigh Sig.", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWS/i/target/sigmaInstrHeight",
    }), // target line
    ICSE: fieldGen("ICSE", "Inst. Centering Sig.", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWS/i/target/sigmaInstrCentering",
    }), // target line
    WSSE: fieldGen("WSSE", "Water Surf. Sig.", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWS/i/target/sigmaWS",
    }), // target line
    HLSRID: fieldGen("HLSRID", "HLSR ID", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWS/i/target/ID",
    }), // target ID
    // HLSRLINE: fieldGen("HLSRLINE", "HLSR Line", {
    //   flex: 0.11,
    //   minWidth: 50,
    //   numDecs: 5,
    //   path: "measECWS/i/target/line",
    // }), // target ID
  }; // residuals data
};

// ========== ECWI OBS. TABLE COLUMNS ========== //
export const generateECWIObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    X: fieldGen("X", "X", {
      show: false,
      path: "referencePoint/fVector/0",
    }), // reference point x coordinate
    Y: fieldGen("Y", "Y", {
      show: false,
      path: "referencePoint/fVector/1",
    }), // reference point y coordinate
    Z: fieldGen("Z", "Z", {
      show: false,
      path: "referencePoint/fVector/2",
    }), // reference point z coordinate
    BEAR: fieldGen("BEAR", "Bearing", {
      show: false,
      path: "fWireBearing/fEstimatedValue",
    }), // reference bearing value
    SBEAR: fieldGen("SBEAR", "Bearing Sig.", {
      show: false,
      path: "fWireBearing/fEstimatedPrecision",
    }), // reference bearing precision
    SLOPE: fieldGen("SLOPE", "Slope", {
      show: false,
      path: "fWireSlope/fEstimatedValue",
    }), // reference  slope value
    SSLOPE: fieldGen("SSLOPE", "Slope Sig.", {
      show: false,
      path: "fWireSlope/fEstimatedPrecision",
    }), // reference slope precision
    DX: fieldGen("DX", "DX", {
      show: false,
      path: "fWireDx/fEstimatedValue",
    }), //
    SDX: fieldGen("SDX", "SDX", {
      show: false,
      path: "fWireDx/fEstimatedPrecision",
    }), //
    DZ: fieldGen("DZ", "DZ", {
      show: false,
      path: "fWireDz/fEstimatedValue",
    }), //
    SDZ: fieldGen("SDZ", "SDZ", {
      show: false,
      path: "fWireDz/fEstimatedPrecision",
    }), //
    SAGFIX: fieldGen("SAGFIX", "Sag Fix", {
      show: false,
      path: "sagfix",
    }), // sag fix
    SAG: fieldGen("SAG", "Sag", {
      show: false,
      path: "sagAdjustable/fEstimatedValue",
    }), // sag
    SSAG: fieldGen("SSAG", "Sag Sig.", {
      show: false,
      path: "sagAdjustable/fEstimatedPrecision",
    }), // sag precision

    // ========== OBS DATA ========== //
    INSPOS: fieldGen("INSPOS", "String name", {
      flex: 1,
      minWidth: 200,
      path: "romName",
      cellClassName: "name-column--cell border-right--cell",
      renderCell: ({ row }) => {
        return (
          <InstrumentTooltip
            title={row.INSPOS}
            details={
              <>
                <div>
                  <b>Ref. point:</b> X (M): {numFormatter(row.X, 5)} Y (M): {numFormatter(row.Y, 5)} Z (M):{" "}
                  {numFormatter(row.Z, 5)}
                </div>
                <div>
                  <b>Wire pars.:</b> Bearing. (GON): {numFormatter(row.BEAR, 5)} SBear. (CC):{" "}
                  {numFormatter(row.SBEAR, 2)} Slope (GON): {numFormatter(row.SLOPE, 2)} SSlope (CC):{" "}
                  {numFormatter(row.SSLOPE, 2)}
                </div>
                <div>
                  DX (M): {numFormatter(row.DX, 5)} SDX (MM): {numFormatter(row.SDX, 2)} DZ (M):{" "}
                  {numFormatter(row.DZ, 2)} SDZ (MM): {numFormatter(row.SDZ, 2)}
                </div>
                <div>
                  SAGFIX {row.SAGFIX ? "true" : "false"} SAG (M): {numFormatter(row.SAG, 5)} SSAG (MM):{" "}
                  {numFormatter(row.SSAG, 2)}
                </div>
              </>
            }
          />
        );
      },
    }), // instrument id
    INSLINE: fieldGen("INSLINE", "ILine", {
      flex: 0.11,
      minWidth: 50,
      path: "line",
      renderCell: ({ row: { INSLINE } }) => {
        return <a href={`surveypad://link//${linkPathPlaceholder},${INSLINE}`}>{INSLINE}</a>;
      },
    }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      flex: 1,
      minWidth: 150,
      path: "measECWI/i/targetPos",
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      path: "measECWI/i/line",
      renderCell: ({ row: { TGTLINE } }) => {
        return <a href={`surveypad://link//${linkPathPlaceholder},${TGTLINE}`}>{TGTLINE}</a>;
      },
    }), // target line

    // ========== ECWI X ========== //
    OBSX: fieldGen("OBSX", "Observed X", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "measECWI/i/distances/0/fValue",
    }), // dist X observations
    SIGX: fieldGen("SIGX", "Sig. X", {
      numDecs: 2,
      path: "measECWI/i/target/sigmaCombinedX",
      unitConv: distM2MMf,
    }), // standard deviation X
    CALCX: fieldGen("CALCX", "Calculated X", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "!measECWI/i/distances/0/fValue!+!measECWI/i/distancesResiduals/0/fValue",
    }), // calculated dist X
    RESX: fieldGen("RESX", "Residual X", {
      numDecs: 2,
      path: "measECWI/i/distancesResiduals/0/fValue",
      unitConv: distM2MMf,
    }), // X dist residual
    RESSIGX: fieldGen("RESSIGX", "Res./Sig. X", {
      numDecs: 2,
      path: "!measECWI/i/distancesResiduals/0/fValue!/!measECWI/i/target/sigmaCombinedX!",
    }), // dist X RES/SIGMA

    // ========== ECWI Z ========== //
    OBSZ: fieldGen("OBSZ", "Observed Z", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "measECWI/i/distances/1/fValue",
    }), // dist Z observations
    SIGZ: fieldGen("SIGZ", "Sigma Z", {
      numDecs: 2,
      path: "measECWI/i/target/sigmaCombinedZ",
      unitConv: distM2MMf,
    }), // standard deviation Z
    CALCZ: fieldGen("CALCZ", "Calculated Z", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "!measECWI/i/distances/1/fValue!+!measECWI/i/distancesResiduals/1/fValue",
    }), // calculated dist Z
    RESZ: fieldGen("RESZ", "Residual Z", {
      numDecs: 2,
      path: "measECWI/i/distancesResiduals/1/fValue",
      unitConv: distM2MMf,
    }), // Z dist residual
    RESSIGZ: fieldGen("RESSIGZ", "Res./Sig. Z", {
      numDecs: 2,
      path: "!measECWI/i/distancesResiduals/1/fValue!/!measECWI/i/target/sigmaCombinedZ!",
    }), // dist Z RES/SIGMA

    // ========== OTHERS ========== //

    XSE: fieldGen("XSE", "XSE", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWI/i/target/sigmaX",
    }), //
    XICSE: fieldGen("XICSE", "XICSE", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWI/i/target/sigmaInstrCenteringX",
    }), //
    ZSE: fieldGen("ZSE", "ZSE", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWI/i/target/sigmaZ",
    }), //
    ZICSE: fieldGen("ZICSE", "ZICSE", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWI/i/target/sigmaInstrCenteringZ",
    }), //

    WISE: fieldGen("WISE", "WISE", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWI/i/target/sigmaWire",
    }), //
    WPSRID: fieldGen("WPSRID", "WPSR ID", {
      flex: 0.11,
      minWidth: 50,
      numDecs: 5,
      path: "measECWI/i/target/ID",
    }), // target ID
    // WPSRLINE: fieldGen("WPSRLINE", "WPSR Line", {
    //   flex: 0.11,
    //   minWidth: 50,
    //   numDecs: 5,
    //   path: "measECWI/i/target/line",
    // }), // target ID
  }; // residuals data
};

// ============================================= //
// ============ WPSR TYPE COLUMNS ============== //
// ============================================= //

// ============================================= //
// ============= NO TYPE COLUMNS =============== //
// ============================================= //

// ========== RADI OBS. TABLE COLUMNS ========== //
export const generateRADIObsCols = () => {
  ///////////////////// ASK
  return {
    // ========== OBS DATA ========== //
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      flex: 1,
      minWidth: 200,
      path: "targetPos",
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      path: "line",
    }), // target line

    // ========== RADI DATA ========== //
    GIS: fieldGen("GIS", "GIS", {
      numDecs: 3,
      path: "fSigmaObsVal",
      unitConv: distM2HMMf,
    }), //
    SIG: fieldGen("SIG", "Sigma", {
      numDecs: 3,
      path: "fSigmaObsVal",
      unitConv: distM2MMf,
    }), //
    RES: fieldGen("RES", "Residual", {
      numDecs: 1,
      path: "fResidual",
      unitConv: distM2MMf,
    }), // residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      numDecs: 3,
      path: "!fResidual!/!fSigmaObsVal!",
    }), // RES/SIGMA
    OBS: fieldGen("OBS", "Observed", {
      numDecs: 3,
      path: "fSigmaObsVal",
      unitConv: distM2HMMf,
    }),
    ACTS: fieldGen("ACTS", "ACTS", {
      numDecs: 3,
      path: "fSigmaObsVal",
      unitConv: distM2HMMf,
    }),
  };
};

// ========== OBSXYZ OBS. TABLE COLUMNS ========== //
export const generateOBSXYZObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      flex: 1,
      minWidth: 200,
      path: "targetPos",
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      path: "line",
    }), // target line

    // ========== OBSXYZ DATA ========== //
    RESX: fieldGen("RESX", "Res. X", {
      numDecs: 3,
      path: "fXResidual",
      unitConv: distM2HMMf,
    }), // X residual
    SX: fieldGen("SX", "S. X", {
      numDecs: 3,
      path: "fXSigmaObsVal",
      unitConv: distM2HMMf,
    }), // X standard deviation
    RESSIGX: fieldGen("RESSIGX", "Res./Sig. X", {
      numDecs: 3,
      path: "!fXResidual!/!fXSigmaObsVal!",
    }), // X RES/SIGMA
    RESY: fieldGen("RESY", "Res. Y", {
      numDecs: 3,
      path: "fYResidual",
      unitConv: distM2HMMf,
    }), // Y residual
    SY: fieldGen("SY", "S. Y", {
      numDecs: 3,
      path: "fYSigmaObsVal",
      unitConv: distM2HMMf,
    }), // Y standard deviation
    RESSIGY: fieldGen("RESSIGY", "Res./Sig. Y", {
      numDecs: 3,
      path: "!fYResidual!/!fYSigmaObsVal!",
    }), // Y RES/SIGMA
    RESZ: fieldGen("RESZ", "Res. Z", {
      numDecs: 3,
      path: "fZResidual",
      unitConv: distM2HMMf,
    }), // Z residual
    SZ: fieldGen("SZ", "S. Z", {
      numDecs: 3,
      path: "fZSigmaObsVal",
      unitConv: distM2HMMf,
    }), // Z standard deviation
    RESSIGZ: fieldGen("RESSIGZ", "Res./Sig. Z", {
      numDecs: 3,
      path: "!fZResidual!/!fZSigmaObsVal!",
    }), // Z RES/SIGMA
  };
};
