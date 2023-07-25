import InstrumentTooltip from "../../components/InstrumentTooltip";
import {
  angleRad2CCf,
  angleRad2GONf,
  distM2HMMf,
  distM2MMf,
  angleRad2GONPosf,
} from "../../data/constants";

import { numFormatter, fieldGen } from "./colUtils";

// =======================================================
// ============= OBSERVATIONS TABLE COLUMNS ==============
// =======================================================

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
    INSLINE: fieldGen("INSLINE", "ILine", {
      flex: 0.11,
      minWidth: 50,
      path: "line",
    }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      flex: 1,
      minWidth: 150,
      path: "rom/measPLR3D/i/targetPos",
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      cellClassName: "border-right--cell",
      path: "rom/measPLR3D/i/line",
    }), // target line

    // ========== ANGL ========== //
    OBSANGL: fieldGen("OBSANGL", "Obs. Angle", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: "roms/i/measPLR3D/i/angles/0/Value",
      unitConv: angleRad2GONf,
    }), // angle observations
    SANGL: fieldGen("SANGL", "S. Ang.", { numDecs: 1 }), // angle standard deviation
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
      path: "!roms/i/measPLR3D/i/distances/0/fValue!*roms/i/measPLR3D/i/anglesResiduals/0/fValue",
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
      path: "!roms/i/measPLR3D/i/angles/1/fValue!+!roms/i/measPLR3D/i/anglesResiduals/1/fValue",
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
      path: "!roms/i/measPLR3D/i/distances/0/fValue!*roms/i/measPLR3D/i/anglesResiduals/1/fValue",
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
    REFPT: fieldGen("REFPT", "Referenve. Pt.", {
      flex: 1,
      minWidth: 200,
      path: "fMeasuredPlane/fName",
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
    REFLINE: fieldGen("REFLINE", "RLine", {
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
