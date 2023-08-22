import InstrumentTooltip from "../../components/InstrumentTooltip";
import { angleRad2CCf, angleRad2GONf, distM2HMMf, distM2MMf, angleRad2GONPosf } from "../../data/constants";

import { numFormatter, numFormatterUnits, fieldGen } from "./colUtils";
import { linkPathPlaceholder } from "../../data/constants";

// =======================================================
// ============= OBSERVATIONS TABLE COLUMNS ==============
// =======================================================

// ============================================= //
// ========== POLAR TYPE COLUMNS =============== //
// ============================================= //

// ========== PL3D OBS. TABLE COLUMNS ========== //
export const generateTSTNObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    HI: fieldGen("HI", "HI", {
      show: false,
      path: "instrumentHeightAdjustable/fEstimatedValue",
      units: "M",
    }), // instrument height
    SHI: fieldGen("SHI", "SHI", {
      show: false,
      path: "instrumentHeightAdjustable/fEstimatedPrecision",
      units: "MM",
    }), // instrument height precision
    ROT3D: fieldGen("ROT3D", "ROT3D", { show: false, path: "rot3D" }), // rotation 3D
    ACST: fieldGen("ACST", "ACST", { show: false, path: "roms/i/acst", units: "GON" }), // angle constant
    V0: fieldGen("V0", "V0", {
      show: false,
      path: "roms/i/v0/fEstimatedValue",
      unitConv: angleRad2GONf,
      units: "GON",
    }), // v0
    SV0: fieldGen("SV0", "SV0", {
      show: false,
      path: "roms/i/v0/fEstimatedPrecision",
      unitConv: angleRad2CCf,
      units: "CC",
    }), // Sigma. V0

    // ========== OBS DATA ========== //
    INSID: fieldGen("INSID", "Instr. ID", {
      size: "L",
      border: true,
      path: "instrument/ID",
      link: "INSIDLINE",
    }), // instrument id
    INSPOS: fieldGen("INSPOS", "Instr. Pos.", {
      size: "XXL",
      path: "instrumentPos",
      link: "INSLINE",
      tooltip: ({ row }) => {
        return (
          <>
            <div>
              <b>Position data:</b> HI (M): {numFormatter(row.HI, 5)} SHI (MM): {numFormatter(row.SHI, 2)} ROT3D:{" "}
              {row.ROT3D ? "true" : "false"}
            </div>
            <div>
              <b>Rom data:</b> ACST (GON): {numFormatter(row.ACST, 5)} V0 (GON): {numFormatter(row.V0, 5)} SV0 (CC):{" "}
              {numFormatter(row.SV0, 1)}
            </div>
          </>
        );
      },
    }), // instrument position
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      size: "L",
      path: "roms/i/measPLR3D/i/targetPos",
      link: "TGTLINE",
      border: true,
    }), // target position
    TYPE: fieldGen("TYPE", "Type", { border: true }), // type of measurement

    INSIDLINE: fieldGen("INSIDLINE", "ILine", { path: "line", show: false }), // instrument line
    INSLINE: fieldGen("INSLINE", "ILine", { path: "lkp:instrumentPos", show: false }), // instrument line
    TGTLINE: fieldGen("TGTLINE", "TLine", { show: false, path: "lkp:roms/i/measPLR3D/i/targetPos" }), // target line
    OBSLINE: fieldGen("OBSLINE", "OLine", { show: false, path: "roms/i/measPLR3D/i/line" }), // observation line

    // ========== ANGL ========== //
    OBSANGL: fieldGen("OBSANGL", "Obs. Angle", {
      units: "GON",
      path: "roms/i/measPLR3D/i/angles/0/fValue",
      link: "OBSLINE",
    }), // angle observations
    SANGL: fieldGen("SANGL", "S. Ang.", {
      units: "CC",
      path: "roms/i/measPLR3D/i/target/sigmaCombinedPLRAngl",
    }), // angle standard deviation
    CALCANGL: fieldGen("CALCANGL", "Calc. Angl.", {
      units: "GON",
      path: "!roms/i/measPLR3D/i/angles/0/fValue!+!roms/i/measPLR3D/i/anglesResiduals/0/fValue!",
    }), // calculated angle
    RESANGL: fieldGen("RESANGL", "Res. Angl.", {
      units: "CC",
      path: "roms/i/measPLR3D/i/anglesResiduals/0/fValue",
    }), // angle residual
    RESSIGANGL: fieldGen("RESSIGANGL", "Res./Sig. Angl.", {
      units: "-",
      path: "!roms/i/measPLR3D/i/anglesResiduals/0/fValue!/!roms/i/measPLR3D/i/target/sigmaCombinedPLRAngl!",
    }), // angle RES/SIGMA
    ECARTSANGL: fieldGen("ECARTSANGL", "Ecarts Angl.", {
      units: "MM",
      path: "!roms/i/measPLR3D/i/distances/0/fValue!*!roms/i/measPLR3D/i/anglesResiduals/0/fValue!",
    }), // angle ECARTS
    OBSEANGL: fieldGen("OBSEANGL", "Observ. Sig. Angl.", {
      units: "CC",
      path: "roms/i/measPLR3D/i/target/sigmaAngl",
      border: true,
    }), // angle OBS SIGMA

    // ========== ZEND ========== //
    OBSZEND: fieldGen("OBSZEND", "Obs. Zend.", {
      units: "GON",
      path: "roms/i/measPLR3D/i/angles/1/fValue",
      link: "OBSLINE",
    }), // zenith observations
    SZEND: fieldGen("SZEND", "S. Zend.", {
      units: "CC",
      path: "roms/i/measPLR3D/i/target/sigmaCombinedPLRZenD",
      unitConv: angleRad2CCf,
    }), // zenith standard deviation
    CALCZEND: fieldGen("CALCZEND", "Calc. Zend.", {
      units: "GON",
      path: "!roms/i/measPLR3D/i/angles/1/fValue!+!roms/i/measPLR3D/i/anglesResiduals/1/fValue!",
    }), // calculated zenith
    RESZEND: fieldGen("RESZEND", "Res. Zend.", {
      units: "CC",
      path: "roms/i/measPLR3D/i/anglesResiduals/1/fValue",
    }), // zenith residual
    RESSIGZEND: fieldGen("RESSIGZEND", "Res./Sig. Zend.", {
      units: "-",
      path: "!roms/i/measPLR3D/i/anglesResiduals/1/fValue!/!roms/i/measPLR3D/i/target/sigmaCombinedPLRZenD!",
    }), // zenith RES/SIGMA
    ECARTSZEND: fieldGen("ECARTSZEND", "Ecarts Zend.", {
      units: "MM",
      path: "!roms/i/measPLR3D/i/distances/0/fValue!*!roms/i/measPLR3D/i/anglesResiduals/1/fValue!",
    }), // zenith ECARTS
    OBSEZEND: fieldGen("OBSEZEND", "Observ. Sig. Zend.", {
      units: "CC",
      path: "roms/i/measPLR3D/i/target/sigmaZenD",
      border: true,
    }), // angle OBS ZEND

    // ========== DIST ========== //
    OBSDIST: fieldGen("OBSDIST", "Obs. Dist.", {
      units: "M",
      path: "roms/i/measPLR3D/i/distances/0/fValue",
      link: "OBSLINE",
    }), // distance observations
    SDIST: fieldGen("SDIST", "S. Dist.", {
      units: "MM",
      path: "roms/i/measPLR3D/i/target/sigmaCombinedPLRDist",
      unitConv: distM2MMf,
    }), // distance standard deviation
    CALCDIST: fieldGen("CALCDIST", "Calc. Dist.", {
      units: "M",
      path: "!roms/i/measPLR3D/i/distances/0/fValue!+!roms/i/measPLR3D/i/distancesResiduals/0/fValue!",
    }), // calculated distance
    RESDIST: fieldGen("RESDIST", "Res. Dist.", {
      units: "MM",
      path: "roms/i/measPLR3D/i/distancesResiduals/0/fValue",
    }), // distance residual
    RESSIGDIST: fieldGen("RESSIGDIST", "Res./Sig. Dist.", {
      units: "-",
      path: "!roms/i/measPLR3D/i/distancesResiduals/0/fValue!/!roms/i/measPLR3D/i/target/sigmaCombinedPLRDist!",
    }), // distance RES/SIGMA
    OBSEDIST: fieldGen("OBSEDIST", "Observ. Sig. Dist.", {
      units: "MM",
      path: "roms/i/measPLR3D/i/target/sigmaCombinedPLRAngl",
      border: true,
    }), // angle OBS DIST

    // ========== DIST EXTENSION ========== //

    // SENSI: fieldGen("SENSI", "Sensitivity", {
    //   path: "roms/i/measPLR3D/i/target/sigmaCombinedPLRDist",
    // }), // Sensitivity
    CONST: fieldGen("CONST", "Constant", {
      units: "M",
      path: "roms/i/measPLR3D/i/target/distCorrectionValue",
      fixator: "-SCONSTFIX",
    }), // distance Constant
    SCONST: fieldGen("SCONST", "Sig. Const.", {
      units: "MM",
      path: "roms/i/measPLR3D/i/target/sigmaDCorr",
      fixator: "ySCONSTFIX",
    }), // distance Consatnt Sigma
    SCONSTFIX: fieldGen("SCONSTFIX", "S. Cons.", {
      show: false,
      path: "roms/i/measPLR3D/i/target/distCorrectionUnknown",
    }), // distance Consatnt FIXED
    PPM: fieldGen("PPM", "Dist. PPM", {
      units: "MM/KM",
      path: "roms/i/measPLR3D/i/target/ppmDist",
      border: true,
    }), // distance Consatnt Sigma

    // ========== TGT ========== //
    TGTID: fieldGen("TGTID", "Tgt. Pos.", {
      size: "L",
      path: "roms/i/measPLR3D/i/target/ID",
    }), // target instr ID
    // TGTIDLINE: fieldGen("TGTIDLINE", "Tgt. Line.", {
    //   show: false,
    //   path: "measDSPT/i/target/line",
    // }), // target instr ID
    HTGT: fieldGen("HTGT", "Tgt. height", {
      units: "M",
      path: "roms/i/measPLR3D/i/target/targetHt",
    }), // target height
    THSE: fieldGen("THSE", "Tgt. height. Sig", {
      units: "MM",
      path: "roms/i/measPLR3D/i/target/sigmaTargetHt",
    }), // target
    TCSE: fieldGen("TCSE", "Tgt. centering Sig.", {
      units: "MM",
      path: "roms/i/measPLR3D/i/target/sigmaTargetCentering",
    }), // target
  }; // residuals data
};

export const generateANGLEPaths = () => {
  return {
    // ========== TOOLTIP ========== //
    HI: { path: "instrumentHeightAdjustable/fEstimatedValue" },
    SHI: { path: "instrumentHeightAdjustable/fEstimatedPrecision" },
    ROT3D: { path: "rot3D" },
    ACST: { path: "roms/i/acst" },
    V0: { path: "roms/i/v0/fEstimatedValue" },
    SV0: { path: "roms/i/v0/fEstimatedPrecision" },
    // ========== OBS DATA ========== //
    INSID: { path: "instrument/ID" }, // instrument id
    INSPOS: { path: "instrumentPos" }, // instrument position
    TGTPOS: { path: "roms/i/measANGL/i/targetPos" }, // target position

    INSIDLINE: fieldGen("INSIDLINE", "ILine", { path: "line", show: false }), // instrument line
    INSLINE: fieldGen("INSLINE", "ILine", { path: "lkp:instrumentPos", show: false }), // instrument line
    TGTLINE: { path: "lkp:roms/i/measANGL/i/targetPos" }, // target line
    OBSLINE: { path: "roms/i/measANGL/i/line" }, // observation line
    // ========== ANGLE DATA ========== //
    OBSANGL: { path: "roms/i/measANGL/i/angles/0/fValue" },
    SANGL: { path: "roms/i/measANGL/i/target/sigmaCombinedAngle" },
    CALCANGL: { path: "!roms/i/measANGL/i/angles/0/fValue!+!roms/i/measANGL/i/anglesResiduals/0/fValue!" },
    RESANGL: { path: "roms/i/measANGL/i/anglesResiduals/0/fValue" },
    RESSIGANGL: {
      path: "!roms/i/measANGL/i/anglesResiduals/0/fValue!/!roms/i/measANGL/i/target/sigmaCombinedAngle!",
    },
    // ECARTSANGL: { path: "!roms/i/measANGL/i/distances/0/fValue!*!roms/i/measANGL/i/anglesResiduals/0/fValue!" },
    TGTID: { path: "roms/i/measANGL/i/target/ID" },
    OBSEANGL: { path: "roms/i/measANGL/i/target/sigmaAngl" },
    TCSE: { path: "roms/i/measANGL/i/target/sigmaTargetCentering" },
  };
};

export const generateZENDPaths = () => {
  return {
    // ========== TOOLTIP ========== //
    HI: { path: "instrumentHeightAdjustable/fEstimatedValue" },
    SHI: { path: "instrumentHeightAdjustable/fEstimatedPrecision" },
    ROT3D: { path: "rot3D" },
    ACST: { path: "roms/i/acst" },
    V0: { path: "roms/i/v0/fEstimatedValue" },
    SV0: { path: "roms/i/v0/fEstimatedPrecision" },
    // ========== OBS DATA ========== //
    INSID: { path: "instrument/ID" }, // instrument id
    INSPOS: { path: "instrumentPos" }, // instrument position
    TGTPOS: { path: "roms/i/measZEND/i/targetPos" }, // target position

    INSIDLINE: fieldGen("INSIDLINE", "ILine", { path: "line", show: false }), // instrument line
    INSLINE: fieldGen("INSLINE", "ILine", { path: "lkp:instrumentPos", show: false }), // instrument line
    TGTLINE: { path: "lkp:roms/i/measZEND/i/targetPos" }, // target line
    OBSLINE: { path: "roms/i/measZEND/i/line" }, // observation line
    // ========== ZEND DATA ========== //
    OBSZEND: { path: "roms/i/measZEND/i/angles/0/fValue" },
    SZEND: { path: "roms/i/measZEND/i/target/sigmaCombinedAngle" },
    CALCZEND: { path: "!roms/i/measZEND/i/angles/0/fValue!+!roms/i/measZEND/i/anglesResiduals/0/fValue!" },
    RESZEND: { path: "roms/i/measZEND/i/anglesResiduals/0/fValue" },
    RESSIGZEND: {
      path: "!roms/i/measZEND/i/anglesResiduals/0/fValue!/!roms/i/measZEND/i/target/sigmaCombinedAngle!",
    },
    // ECARTSZEND: { path: "!roms/i/measZEND/i/distances/0/fValue!*!roms/i/measZEND/i/anglesResiduals/1/fValue!" },
    TGTID: { path: "roms/i/measZEND/i/target/ID" },
    OBSEZEND: { path: "roms/i/measZEND/i/target/sigmaZenD" },
    TCSE: { path: "roms/i/measZEND/i/target/sigmaTargetCentering" },
  };
};

export const generateDISTPaths = () => {
  return {
    // ========== TOOLTIP ========== //
    HI: { path: "instrumentHeightAdjustable/fEstimatedValue" },
    SHI: { path: "instrumentHeightAdjustable/fEstimatedPrecision" },
    ROT3D: { path: "rot3D" },
    ACST: { path: "roms/i/acst" },
    V0: { path: "roms/i/v0/fEstimatedValue" },
    SV0: { path: "roms/i/v0/fEstimatedPrecision" },
    // ========== OBS DATA ========== //
    INSID: { path: "instrument/ID" }, // instrument id
    INSPOS: { path: "instrumentPos" }, // instrument position
    TGTPOS: { path: "roms/i/measDIST/i/targetPos" }, // target position

    INSIDLINE: fieldGen("INSIDLINE", "ILine", { path: "line", show: false }), // instrument line
    INSLINE: fieldGen("INSLINE", "ILine", { path: "lkp:instrumentPos", show: false }), // instrument line
    TGTLINE: { path: "lkp:roms/i/measDIST/i/targetPos" }, // target line
    OBSLINE: { path: "roms/i/measDIST/i/line" }, // observation line
    // ========== DIST DATA ========== //
    OBSDIST: { path: "roms/i/measDIST/i/distances/0/fValue" },
    SDIST: { path: "roms/i/measDIST/i/target/sigmaCombinedDist" },
    CALCDIST: { path: "!roms/i/measDIST/i/distances/0/fValue!+!roms/i/measDIST/i/distancesResiduals/0/fValue!" },
    RESDIST: { path: "roms/i/measDIST/i/distancesResiduals/0/fValue" },
    RESSIGDIST: {
      path: "!roms/i/measDIST/i/distancesResiduals/0/fValue!/!roms/i/measDIST/i/target/sigmaCombinedDist!",
    },
    // SENSI: { path: "roms/i/measDIST/i/distances/0/fSensitivity" },
    CONST: { path: "roms/i/measDIST/i/target/distCorrectionValue" }, // distance Consatnt
    SCONST: { path: "roms/i/measDIST/i/target/sigmaDCorr" },
    SCONSTFIX: { path: "roms/i/measDIST/i/target/distCorrectionUnknown" },
    // ========== TGT DATA ========== //
    PPM: { path: "roms/i/measDIST/i/target/ppmDist" },
    TGTID: { path: "roms/i/measDIST/i/target/ID" },
    HTGT: { path: "roms/i/measDIST/i/target/targetHt" },
    THSE: { path: "roms/i/measDIST/i/target/sigmaTargetHt" },
    OBSEDIST: { path: "roms/i/measDIST/i/target/sigmaDist" },
    TCSE: { path: "roms/i/measDIST/i/target/sigmaTargetCentering" },
  };
};

export const generateDHORPaths = () => {
  return {
    // ========== TOOLTIP ========== //
    HI: { path: "instrumentHeightAdjustable/fEstimatedValue" },
    SHI: { path: "instrumentHeightAdjustable/fEstimatedPrecision" },
    ROT3D: { path: "rot3D" },
    ACST: { path: "roms/i/acst" },
    V0: { path: "roms/i/v0/fEstimatedValue" },
    SV0: { path: "roms/i/v0/fEstimatedPrecision" },
    // ========== OBS DATA ========== //
    INSID: { path: "instrument/ID" }, // instrument id
    INSPOS: { path: "instrumentPos" }, // instrument position
    TGTPOS: { path: "roms/i/measDHOR/i/targetPos" }, // target position

    INSIDLINE: fieldGen("INSIDLINE", "ILine", { path: "line", show: false }), // instrument line
    INSLINE: fieldGen("INSLINE", "ILine", { path: "lkp:instrumentPos", show: false }), // instrument line
    TGTLINE: { path: "lkp:roms/i/measDHOR/i/targetPos" }, // target line
    OBSLINE: { path: "roms/i/measDHOR/i/line" }, // observation line
    // ========== DHOR DATA ========== //
    OBSDIST: { path: "roms/i/measDHOR/i/distances/0/fValue" },
    SDIST: { path: "roms/i/measDHOR/i/target/sigmaCombinedDist" },
    CALCDIST: { path: "!roms/i/measDHOR/i/distances/0/fValue!+!roms/i/measDHOR/i/distancesResiduals/0/fValue!" },
    RESDIST: { path: "roms/i/measDHOR/i/distancesResiduals/0/fValue" },
    RESSIGDIST: {
      path: "!roms/i/measDHOR/i/distancesResiduals/0/fValue!/!roms/i/measDHOR/i/target/sigmaCombinedDist!",
    },
    CONST: { path: "roms/i/measDHOR/i/target/distCorrectionValue" }, // distance Consatnt
    SCONST: { path: "roms/i/measDHOR/i/target/sigmaDCorr" },
    SCONSTFIX: { path: "roms/i/measDHOR/i/target/distCorrectionUnknown" },
    // ========== TGT DATA ========== //
    PPM: { path: "roms/i/measDHOR/i/target/ppmDist" },
    TGTID: { path: "roms/i/measDHOR/i/target/ID" },
    HTGT: { path: "roms/i/measDHOR/i/target/targetHt" },
    THSE: { path: "roms/i/measDHOR/i/target/sigmaTargetHt" },
    OBSEDIST: { path: "roms/i/measDHOR/i/target/sigmaDist" },
    TCSE: { path: "roms/i/measDHOR/i/target/sigmaTargetCentering" },
  };
};

export const generateTSTNPaths = () => {
  return {
    measANGL: generateANGLEPaths(),
    measZEND: generateZENDPaths(),
    measDIST: generateDISTPaths(),
    measDHOR: generateDHORPaths(),
  };
};

// =========== ORI OBS. TABLE COLUMNS ========== //
export const generateORIEObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    INSPOS: fieldGen("INSPOS", "Station", { size: "L", path: "instrumentPos", border: true, link: "INSLINE" }), // instrument id
    TGTPOS: fieldGen("TGTPOS", "Point", { size: "XL", path: "measORIE/i/targetPos", border: true, link: "TGTLINE" }), // target position

    INSLINE: fieldGen("INSLINE", "RLine", { show: false, path: "line" }), // instrument line
    TGTLINE: fieldGen("TGTLINE", "TLine", { show: false, path: "lkp:measORIE/i/targetPos" }), // target line
    OBSLINE: fieldGen("OBSLINE", "OLine", { show: false, path: "measORIE/i/line" }), // target line

    // ========== ORIE DATA ========== //
    OBS: fieldGen("OBS", "Observed", { units: "GON", path: "measORIE/i/angles/0/fValue", link: "OBSLINE" }), // observations
    SIGMA: fieldGen("SIGMA", "Sigma", { units: "CC", path: "measORIE/i/target/sigmaCombinedAngle" }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      units: "GON",
      path: "!measORIE/i/angles/0/fValue!+!measORIE/i/anglesResiduals/0/fValue!",
    }), // calculated
    RES: fieldGen("RES", "Residual", { units: "CC", path: "measORIE/i/anglesResiduals/0/fValue" }), // residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      units: "-",
      path: "!measORIE/i/anglesResiduals/0/fValue!/!measORIE/i/target/sigmaCombinedAngle!",
      border: true,
    }), // RES/SIGMA
    TRGT: fieldGen("TRGT", "Target", { size: "L", path: "measORIE/i/target/ID" }), // target
    OBSE: fieldGen("OBSE", "Observ. Sig.", { units: "CC", path: "measORIE/i/target/sigmaAngl" }), // observations
    TCSE: fieldGen("TCSE", "Tgt. centering Sig.", { units: "MM", path: "measORIE/i/target/sigmaTargetCentering" }), // standard deviation
  }; // residuals data
};

// ============================================= //
// ============ CAMD TYPE COLUMNS =============== //
// ============================================= //

// =========== UVD OBS. TABLE COLUMNS ========== //
export const generateUVDObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    INSID: fieldGen("INSID", "Instrument", { size: "L", path: "instrument/ID", border: true, link: "INSIDLINE" }), // instrument id
    INSPOS: fieldGen("INSPOS", "Instr. Position", { size: "XL", path: "instrumentPos", border: true, link: "INSLINE" }), // instrument id
    TGT: fieldGen("TGT", "Target", { size: "L", path: "instrument/defTarget" }), // target position
    TGTPOS: fieldGen("TGTPOS", "Tgt. Position", { size: "XXL", path: "measUVEC/i/targetPos", link: "TGTLINE" }), // target position
    TYPE: fieldGen("TYPE", "Type"), // obs. type
    INSIDLINE: fieldGen("INSIDLINE", "IDLine", { show: false, path: "line" }), // instrument line
    INSLINE: fieldGen("INSLINE", "ILine", { show: false, path: "lkp:instrumentPos" }), // instrument line
    TGTLINE: fieldGen("TGTLINE", "TLine", { show: false, path: "lkp:measUVD/i/targetPos" }), // target line
    OBSLINE: fieldGen("OBSLINE", "OBSLINE", { show: false, path: "measUVD/i/line" }), // target line

    // ========== X DATA ========== //
    OBSXV: fieldGen("OBSXV", "Observed X Vec.", { units: "M", path: "measUVD/i/vector/fVector/0", link: "OBSLINE" }), // observations
    SXV: fieldGen("SXV", "Sigma X Vec.", { units: "MM", path: "measUVD/i/target/sigmaCombinedX" }), // standard deviation
    CALCXV: fieldGen("CALCXV", "Calculated X Vec.", {
      units: "M",
      path: "!measUVD/i/vector/fVector/0!+!measUVD/i/XcompResidual!",
    }), // calculated
    RESXV: fieldGen("RESXV", "Residual X Vec.", { units: "MM", path: "measUVD/i/XcompResidual" }), // residual
    RESSIGXV: fieldGen("RESSIGXV", "Res./Sig. X Vec.", {
      units: "-",
      path: "!measUVD/i/XcompResidual!/!measUVD/i/target/sigmaCombinedX!",
    }), // RES/SIGMA

    // ========== Y DATA ========== //
    OBSYV: fieldGen("OBSYV", "Observed Y Vec.", { units: "M", path: "measUVD/i/vector/fVector/1", link: "OBSLINE" }), // observations
    SYV: fieldGen("SYV", "Sigma Y Vec.", { units: "MM", path: "measUVD/i/target/sigmaCombinedY" }), // standard deviation
    CALCYV: fieldGen("CALCYV", "Calculated Y Vec.", {
      units: "M",
      path: "!measUVD/i/vector/fVector/1!+!measUVD/i/YcompResidual!",
    }), // calculated
    RESYV: fieldGen("RESYV", "Residual Y Vec.", { units: "MM", path: "measUVD/i/YcompResidual" }), // residual
    RESSIGYV: fieldGen("RESSIGYV", "Res./Sig. Y Vec.", {
      units: "-",
      path: "!measUVD/i/YcompResidual!/!measUVD/i/target/sigmaCombinedY!",
    }), // RES/SIGMA

    // ========== DIST DATA ========== //
    OBSDIST: fieldGen("OBSDIST", "Observed Dist.", { units: "M", path: "measUVD/i/sdist", link: "OBSLINE" }), // observations
    SDIST: fieldGen("SDIST", "Sigma Dist.", { units: "MM", path: "measUVD/i/target/sigmaCombinedDist" }), // standard deviation
    CALCDIST: fieldGen("CALCDIST", "Calculated Dist.", {
      units: "M",
      path: "!measUVD/i/sdist!+!measUVD/i/sdistResidual!",
    }), // calculated
    RESDIST: fieldGen("RESDIST", "Residual Dist.", { units: "MM", path: "measUVD/i/sdistResidual" }), // residual
    RESSIGDIST: fieldGen("RESSIGDIST", "Res./Sig. Dist.", {
      units: "-",
      path: "!measUVD/i/sdistResidual!/!measUVD/i/target/sigmaCombinedDist!",
    }), // RES/SIGMA

    // ========== TGT DATA ========== //

    OBSEX: fieldGen("OBSEX", "Observed Sig. X", { units: "MM", path: "measUVD/i/target/sigmaX" }), // RES/SIGMA
    OBSEY: fieldGen("OBSEY", "Observed Sig. Y", { units: "MM", path: "measUVD/i/target/sigmaY" }), // target
    OBSED: fieldGen("OBSED", "Observ. Sig. Dist", { units: "MM", path: "measUVD/i/target/sigmaDist" }), // observations
    TCSE: fieldGen("TCSE", "Tgt. centering Sig.", { units: "MM", path: "measUVD/i/target/sigmaTargetCentering" }), // standard deviation
  }; // residuals data
};

// =========== UVEC OBS. TABLE COLUMNS ========== //
export const generateUVECObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    INSID: fieldGen("INSID", "Instrument", { size: "L", path: "instrument/ID", border: true, link: "INSIDLINE" }), // instrument id
    INSPOS: fieldGen("INSPOS", "Instr. Position", { size: "XL", path: "instrumentPos", border: true, link: "INSLINE" }), // instrument id
    TGT: fieldGen("TGT", "Target", { size: "L", path: "instrument/defTarget" }), // target position
    TGTPOS: fieldGen("TGTPOS", "Tgt. Position", { size: "XXL", path: "measUVEC/i/targetPos", link: "TGTLINE" }), // target position
    TYPE: fieldGen("TYPE", "Type"), // obs. type
    INSIDLINE: fieldGen("INSIDLINE", "IDLine", { show: false, path: "line" }), // instrument line
    INSLINE: fieldGen("INSLINE", "ILine", { show: false, path: "lkp:instrumentPos" }), // instrument line
    TGTLINE: fieldGen("TGTLINE", "TLine", { show: false, path: "lkp:measUVEC/i/targetPos" }), // target line
    OBSLINE: fieldGen("OBSLINE", "OBSLINE", { show: false, path: "measUVEC/i/line" }), // target line

    // ========== X DATA ========== //
    OBSXV: fieldGen("OBSXV", "Observed X Vec.", { units: "M", path: "measUVEC/i/vector/fVector/0", link: "OBSLINE" }), // observations
    SXV: fieldGen("SXV", "Sigma X Vec.", { units: "MM", path: "measUVEC/i/target/sigmaCombinedX" }), // standard deviation
    CALCXV: fieldGen("CALCXV", "Calculated X Vec.", {
      units: "M",
      path: "!measUVEC/i/vector/fVector/0!+!measUVEC/i/XcompResidual!",
    }), // calculated
    RESXV: fieldGen("RESXV", "Residual X Vec.", { units: "MM", path: "measUVEC/i/XcompResidual" }), // residual
    RESSIGXV: fieldGen("RESSIGXV", "Res./Sig. X Vec.", {
      units: "-",
      path: "!measUVEC/i/XcompResidual!/!measUVEC/i/target/sigmaCombinedX!",
    }), // RES/SIGMA

    // ========== Y DATA ========== //
    OBSYV: fieldGen("OBSYV", "Observed Y Vec.", { units: "M", path: "measUVEC/i/vector/fVector/1", link: "OBSLINE" }), // observations
    SYV: fieldGen("SYV", "Sigma Y Vec.", { units: "MM", path: "measUVEC/i/target/sigmaCombinedY" }), // standard deviation
    CALCYV: fieldGen("CALCYV", "Calculated Y Vec.", {
      units: "M",
      path: "!measUVEC/i/vector/fVector/1!+!measUVEC/i/YcompResidual!",
    }), // calculated
    RESYV: fieldGen("RESYV", "Residual Y Vec.", { units: "MM", path: "measUVEC/i/YcompResidual" }), // residual
    RESSIGYV: fieldGen("RESSIGYV", "Res./Sig. Y Vec.", {
      units: "-",
      path: "!measUVEC/i/YcompResidual!/!measUVEC/i/target/sigmaCombinedY!",
    }), // RES/SIGMA

    // ========== TGT DATA ========== //
    OBSEX: fieldGen("OBSEX", "Observed Sig. X", { units: "MM", path: "measUVEC/i/target/sigmaX" }), // RES/SIGMA
    OBSEY: fieldGen("OBSEY", "Observed Sig. Y", { units: "MM", path: "measUVEC/i/target/sigmaY" }), // target
    TCSE: fieldGen("TCSE", "Tgt. centering Sig.", { units: "MM", path: "measUVEC/i/target/sigmaTargetCentering" }), // standard deviation
  }; // residuals data
};

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
      units: "M",
    }), // instrument height

    // ========== OBS DATA ========== //
    INSID: fieldGen("INSID", "Instrument", { size: "M", border: true, path: "instrument/ID", link: "INSIDLINE" }), // instrument id
    INSPOS: fieldGen("INSPOS", "Instr. Pos.", {
      size: "XXL",
      path: "instrumentPos",
      link: "INSLINE",
      tooltip: ({ row }) => {
        return (
          <div>
            <b>Position data:</b> HINSTR (M): {numFormatter(row.HI, 5)}
          </div>
        );
      },
    }), // instrument position
    TGTPOS: fieldGen("TGTPOS", "Point", { size: "L", path: "measDSPT/i/targetPos" }), // target position
    INSIDLINE: fieldGen("INSIDLINE", "ILine", { path: "line", show: false }), // instrument line
    INSLINE: fieldGen("INSLINE", "ILine", { path: "lkp:instrumentPos", show: false }), // instrument line
    TGTLINE: fieldGen("TGTLINE", "TLine", { path: "lkp:measDSPT/i/targetPos", show: false }), // target line
    OBSLINE: fieldGen("OBSLINE", "OLine", { path: "measDSPT/i/line", show: false }), // target line

    // ========== DSPT ========== //
    OBS: fieldGen("OBS", "Observed", { units: "M", path: "measDSPT/i/distances/0/fValue", link: "OBSLINE" }), // angle observations
    SIG: fieldGen("SIG", "Sigma", { units: "MM", path: "measDSPT/i/target/sigmaCombinedDist" }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      units: "M",
      path: "!measDSPT/i/distances/0/fValue!+!measDSPT/i/distancesResiduals/0/fValue",
    }), // calculated dist
    RES: fieldGen("RES", "Residual", { units: "MM", path: "measDSPT/i/distancesResiduals/0/fValue" }), // dist residual
    // SENSI: fieldGen("SENSI", "Sensitivity", {
    //   path: "measDSPT/i/distancesResiduals/0/fValue",
    // }), //
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      units: "-",
      path: "!measDSPT/i/distancesResiduals/0/fValue!/!measDSPT/i/target/sigmaCombinedDist!",
    }), // RES/SIGMA
    CONST: fieldGen("CONST", "Constant", {
      units: "M",
      path: "measDSPT/i/target/distCorrectionValue",
      fixator: "-SCONSTFIX",
    }), //
    SCONST: fieldGen("SCONST", "S. Cons.", {
      units: "MM",
      path: "measDSPT/i/target/sigmaDCorr",
      fixator: "ySCONSTFIX",
      border: true,
    }), // zenith standard deviation
    SCONSTFIX: fieldGen("SCONSTFIX", "S. Cons. Fix", {
      show: false,
      path: "measDSPT/i/target/distCorrectionUnknown",
    }), // zenith standard deviation

    // ========== TGT ========== //
    TGTID: fieldGen("TGTID", "Tgt. Pos.", { size: "L", path: "measDSPT/i/target/ID" }), // target instr ID
    // TGTIDLINE: fieldGen("TGTIDLINE", "Tgt. Line.", {
    //   path: "measDSPT/i/target/line",
    // }), // target instr ID
    HTGT: fieldGen("HTGT", "Tgt. height", { units: "M", path: "measDSPT/i/target/targetHt" }), // target height
    OBSE: fieldGen("OBSE", "Observ. Sig.", { untis: "MM", path: "measDSPT/i/target/sigmaDSpt" }), // target
    PPM: fieldGen("PPM", "PPM", { units: "MM/KM", path: "measDSPT/i/target/ppmDSpt" }), // target
    TCSE: fieldGen("TCSE", "Tgt. centering Sig.", { units: "MM", path: "measDSPT/i/target/sigmaTargetCentering" }), // target
    THSE: fieldGen("THSE", "Tgt. height. Sig", { units: "MM", path: "measDSPT/i/target/sigmaTargetHt" }), // target
  }; // residuals data
};

// ============================================= //
// =========== LEVEL TYPE COLUMNS ============== //
// ============================================= //

// ========== DLEV OBS. TABLE COLUMNS ========== //
export const generateDLEVObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //

    X: fieldGen("X", "X", {
      show: false,
      path: "fRefPt/fEstimatedValueInRoot/fVector/0",
    }), // reference point x coordinate
    Y: fieldGen("Y", "Y", {
      show: false,
      path: "fRefPt/fEstimatedValueInRoot/fVector/1",
    }), // reference point y coordinate
    Z: fieldGen("Z", "Z", {
      show: false,
      path: "fRefPt/fEstimatedValueInRoot/fVector/2",
    }), // reference point z coordinate
    HDIST: fieldGen("HDIST", "HDIST", {
      show: false,
      path: "fMeasuredPlane/fEstValRefPointDist",
      unitConv: distM2MMf,
    }), // reference string x coordinate
    SHDIST: fieldGen("SHDIST", "SHDIST", {
      show: false,
      path: "fMeasuredPlane/fEstPrecisionRefPtDist",
      unitConv: distM2MMf,
    }), // reference string y coordinate

    // ========== OBS DATA ========== //
    INSID: fieldGen("INSID", "INSID", { size: "L", link: "INSIDLINE", path: "instrument/ID" }), // reference string orientation
    INSPOS: fieldGen("INSPOS", "Ref. Pt.", {
      size: "XL",
      path: "fRefPt/fName",
      link: "INSLINE",
      border: true,
      tooltip: ({ row }) => {
        return (
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
        );
      },
    }), // instrument id
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { size: "XL", path: "measDLEV/i/targetPos", link: "TGTLINE" }), // target position
    INSIDLINE: fieldGen("INSIDLINE", "INSIDLINE", { show: false, path: "line" }), // reference string orientation
    INSLINE: fieldGen("INSLINE", "RLine", { show: false, path: "fRefPt/line" }), // instrument line
    TGTLINE: fieldGen("TGTLINE", "TLine", { show: false, path: "lkp:measDLEV/i/targetPos" }), // target line
    OBSLINE: fieldGen("OBSLINE", "OLine", { show: false, path: "measDLEV/i/line" }), // target line

    // ========== DLEV DATA ========== //
    OBS: fieldGen("OBS", "Observed", { units: "M", path: "measDLEV/i/distances/0/fValue", link: "OBSLINE" }), // observations
    SIGMA: fieldGen("SIGMA", "Sigma", { units: "MM", path: "measDLEV/i/target/sigmaCombinedDist" }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      units: "M",
      path: "!measDLEV/i/distances/0/fValue!+!measDLEV/i/distancesResiduals/0/fValue!",
    }), // calculated
    RES: fieldGen("RES", "Residual", { units: "MM", path: "measDLEV/i/distancesResiduals/0/fValue" }), // residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      units: "-",
      path: "!measDLEV/i/distancesResiduals/0/fValue!/!measDLEV/i/target/sigmaCombinedDist!",
    }), // RES/SIGMA
    COLL: fieldGen("COLL", "Collimation", {
      units: "GON",
      fixator: "SCOLLFIXED",
      path: "instrument/collAngleAdjustable/fEstimatedValue",
    }), // collimation
    SCOLL: fieldGen("SCOLL", "Coll. Sigma", {
      units: "CC",
      fixator: "xSCOLLFIXED",
      border: true,
      path: "instrument/collAngleAdjustable/fEstimatedPrecision",
    }), // sigmacollimation
    SCOLLFIXED: fieldGen("SCOLLFIXED", "SCOLLFIXED", {
      show: false,
      path: "instrument/collAngleAdjustable/ifFixed",
    }), // collimation fixed

    // ========== DHOR DATA ========== //
    DHOR: fieldGen("DHOR", "Dist. Hor.", { units: "M", path: "measDLEV/i/dhor/distances/0/fValue" }), // DHOR
    SDHOR: fieldGen("SDHOR", "Sig. DHor.", { units: "MM", path: "measDLEV/i/dhor/dhorSigma" }), // SDHOR
    CALCDHOR: fieldGen("CALCDHOR", "CALCDHOR", {
      units: "M",
      path: "!measDLEV/i/dhor/distances/0/fValue!+!measDLEV/i/dhor/distancesResiduals/0/fValue!",
    }), // CALCDHOR
    RESDHOR: fieldGen("RESDHOR", "Resid. DHor.", { units: "MM", path: "measDLEV/i/dhor/distancesResiduals/0/fValue" }), // RESDHOR
    RESSIGDHOR: fieldGen("RESSIGDHOR", "Res./Sig. Dhor.", {
      units: "-",
      path: "!measDLEV/i/dhor/distancesResiduals/0/fValue!/!measDLEV/i/dhor/dhorSigma!",
      border: true,
    }), // RESSIGDHOR

    // ========== TGT DATA ========== //
    CONST: fieldGen("CONST", "Constant", { units: "M", path: "measDLEV/i/target/distCorrectionValue" }), // distance Constant
    SCONST: fieldGen("SCONST", "Sig. Const.", { units: "MM", path: "measDLEV/i/target/sigmaDCorr" }), // distance Consatnt Sigma
    OBSE: fieldGen("OBSE", "Observ. Sig.", { units: "MM", path: "measDLEV/i/target/sigmaD" }), // target line
    PPM: fieldGen("PPM", "Dist. PPM", { units: "MM/KM", path: "measDLEV/i/target/ppmD" }), // distance Consatnt Sigma
    HTGT: fieldGen("HTGT", "Tgt. height", { units: "M", path: "measDLEV/i/target/staffHt" }), // target height
    THSE: fieldGen("THSE", "Tgt. height. Sig", { units: "MM", path: "measDLEV/i/target/sigmaStaffHt" }), // target
  }; // residuals data
};

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
      units: "M",
    }), // reference point x coordinate
    Y: fieldGen("Y", "Y", {
      show: false,
      path: "fMeasuredPlane/fReferencePoint/fEstimatedValueInRoot/fVector/1",
      units: "M",
    }), // reference point y coordinate
    Z: fieldGen("Z", "Z", {
      show: false,
      path: "fMeasuredPlane/fReferencePoint/fEstimatedValueInRoot/fVector/2",
      units: "M",
    }), // reference point z coordinate
    PX: fieldGen("PX", "PX", {
      show: false,
      path: "fMeasuredPlane/fReferencePoint/fEstimatedValueInRoot/fVector/0",
      units: "M",
    }), // reference string x coordinate
    PY: fieldGen("PY", "PY", {
      show: false,
      path: "fMeasuredPlane/fReferencePoint/fEstimatedValueInRoot/fVector/0",
      units: "M",
    }), // reference string y coordinate
    O: fieldGen("O", "O", {
      show: false,
      path: "fMeasuredPlane/fEstValTheta",
      unitConv: angleRad2GONPosf,
      units: "GON",
    }), // reference string orientation
    SO: fieldGen("SO", "SO", {
      show: false,
      path: "fMeasuredPlane/fEstPrecisionTheta",
      unitConv: angleRad2CCf,
      units: "CC",
    }), // reference string orientation precision
    SN: fieldGen("SN", "SN", {
      show: false,
      path: "fMeasuredPlane/fEstPrecisionRefPtDist",
      unitConv: distM2MMf,
      units: "MM",
    }), // reference string normale precision

    // ========== OBS DATA ========== //
    INSPOS: fieldGen("INSPOS", "Reference Pt.", {
      size: "L",
      path: "fMeasuredPlane/fReferencePoint/fName",
      link: "INSLINE",
      border: true,
      tooltip: ({ row }) => {
        return (
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
        );
      },
    }), // instrument id
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { size: "L", path: "measECHO/i/targetPos", border: true, link: "TGTLINE" }), // target position
    INSLINE: fieldGen("INSLINE", "RLine", { path: "line", show: false }), // instrument line -- or one could use fMeasuredPlane/fReferencePoint/line
    TGTLINE: fieldGen("TGTLINE", "TLine", { path: "lkp:measECHO/i/targetPos", show: false }), // target line
    OBSLINE: fieldGen("OBSLINE", "OLine", { path: "measECHO/i/line", show: false }), // obs line

    // ========== ECHO DATA ========== //
    OBS: fieldGen("OBS", "Observed", { size: "M", units: "M", path: "measECHO/i/distances/0/fValue", link: "OBSLINE" }), // observations
    SIGMA: fieldGen("SIGMA", "Sigma", {
      units: "MM",
      path: "measECHO/i/target/sigmaCombinedDist",
      unitConv: distM2MMf,
    }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      size: "M",
      units: "M",
      path: "!measECHO/i/distances/0/fValue!+!measECHO/i/distancesResiduals/0/fValue!",
    }), // calculated
    RES: fieldGen("RES", "Residual", {
      units: "MM",
      path: "measECHO/i/distancesResiduals/0/fValue",
      unitConv: distM2MMf,
    }), // residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      units: "-",
      path: "!measECHO/i/distancesResiduals/0/fValue!/!measECHO/i/target/sigmaCombinedDist!",
      border: true,
    }), // RES/SIGMA

    // ========== INSTR DATA ========== //
    SCALEID: fieldGen("SCALEID", "Scale", { path: "measECHO/i/target/ID" }), // scale id
    // SCALELINE: fieldGen("SCALELINE", "Scale Line", {
    //   path: "measECHO/i/target/ID",
    // }), // scale line
    OBSE: fieldGen("OBSE", "Observ. Sig.", {
      units: "MM",
      path: "measECHO/i/target/sigmaD",
      unitConv: distM2MMf,
    }), // observation sigma
    PPM: fieldGen("PPM", "PPM", { units: "MM/KM", path: "measECHO/i/target/ppmD" }), // ppm
    ICSE: fieldGen("ICSE", "ICSE", {
      units: "MM",
      path: "measECHO/i/target/sigmaInstrCentering",
      unitConv: distM2MMf,
    }), // instrument centering sigma
  }; // residuals data
};

// ============================================= //
// ============ INCL TYPE COLUMNS ============== //
// ============================================= //

// ========== INCLY OBS. TABLE COLUMNS ========== //
export const generateINCLYObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      size: "XL",
      path: "measINCLY/i/targetPos",
      link: "TGTLINE",
      border: true,
    }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", { show: false, path: "lkp:measINCLY/i/targetPos" }), // target line
    OBSLINE: fieldGen("OBSLINE", "OLine", { show: false, path: "measINCLY/i/line" }), // target line

    // ========== DSPT ========== //
    OBS: fieldGen("OBS", "Observed", { units: "GON", path: "measINCLY/i/angles/0/fValue", link: "OBSLINE" }), // angle observations
    SIG: fieldGen("SIG", "Sigma", { units: "CC", path: "measINCLY/i/target/sigmaCombinedAngle" }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      units: "GON",
      path: "!measINCLY/i/angles/0/fValue!+!measINCLY/i/anglesResiduals/0/fValue!",
    }), // calculated angle
    RES: fieldGen("RES", "Residual", { units: "CC", path: "measINCLY/i/anglesResiduals/0/fValue" }), // angle residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      units: "-",
      path: "!measINCLY/i/anglesResiduals/0/fValue!/!measINCLY/i/target/sigmaCombinedAngle!",
      border: true,
    }), // angle RES/SIGMA
    INSPOS: fieldGen("INSPOS", "Incl. ID", { size: "L", path: "instrument/ID", link: "INSLINE" }), // target ID
    INSLINE: fieldGen("INSLINE", "ILine", { show: false, path: "line" }), // instrument line
    OBSE: fieldGen("OBSE", "Observ. Sig.", { units: "CC", path: "measINCLY/i/target/sigmaAngl" }), // target line
    AC: fieldGen("AC", "AC", { units: "GON", path: "measINCLY/i/target/angleCorrectionValue" }), // target line
    ACSE: fieldGen("ACSE", "AC Sig.", { units: "CC", path: "measINCLY/i/target/sigmaCorrectionValue" }), // target line
    RF: fieldGen("RF", "RF", { units: "GON", path: "measINCLY/i/target/refAngleCorrectionValue" }), // target line
    RFSE: fieldGen("RFSE", "RF Sig.", { units: "CC", path: "measINCLY/i/target/refSigmaCorrectionValue" }), // target line
  }; // residuals data
};

// ============================================= //
// ============ HLSR TYPE COLUMNS ============== //
// ============================================= //

// ========== ECWS OBS. TABLE COLUMNS ========== //
export const generateECWSObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    HI: fieldGen("HI", "Surface Height", {
      show: false,
      units: "M",
      path: "fMeasuredWSHeight/fEstimatedValue",
    }), // instrument height
    PREC: fieldGen("PREC", "Surface Prec.", {
      units: "MM",
      show: false,
      path: "fMeasuredWSHeight/fEstimatedPrecision",
    }), // instrument height

    // ========== OBS DATA ========== //
    INSPOS: fieldGen("INSPOS", "Instr. Pos.", {
      size: "L",
      path: "romName",
      link: "INSLINE",
      tooltip: ({ row }) => {
        return (
          <div>
            <b>Position data:</b> Surface height (M): {numFormatter(row.HI, 5)}, Sigma (MM): {numFormatter(row.PREC, 2)}
          </div>
        );
      },
    }), // instrument position
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", {
      size: "XXL",
      path: "measECWS/i/targetPos",
      link: "TGTLINE",
      border: true,
    }), // target position
    INSLINE: fieldGen("INSLINE", "ILine", { path: "line", show: false }), // instrument line
    TGTLINE: fieldGen("TGTLINE", "TLine", { path: "lkp:measECWS/i/targetPos", show: false }), // target line
    OBSLINE: fieldGen("OBSLINE", "OLine", { path: "measECWS/i/line", show: false }), // observation line

    // ========== DSPT ========== //
    OBS: fieldGen("OBS", "Observed", { units: "M", path: "measECWS/i/distances/0/fValue", link: "OBSLINE" }), // angle observations
    SIG: fieldGen("SIG", "Sigma", { units: "MM", path: "measECWS/i/target/sigmaCombinedDist" }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", {
      units: "M",
      path: "!measECWS/i/distances/0/fValue!+!measECWS/i/distancesResiduals/0/fValue",
    }), // calculated angle
    RES: fieldGen("RES", "Residual", { units: "MM", path: "measECWS/i/distancesResiduals/0/fValue" }), // angle residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", {
      units: "-",
      path: "!measECWS/i/distancesResiduals/0/fValue!/!measECWS/i/target/sigmaCombinedDist!",
      border: true,
    }), // angle RES/SIGMA
    OBSE: fieldGen("OBSE", "Observ. Sig.", { units: "MM", path: "measECWS/i/target/sigmaDist" }), // target line
    IHSE: fieldGen("IHSE", "I. Heigh Sig.", { units: "MM", path: "measECWS/i/target/sigmaInstrHeight" }), // target line
    ICSE: fieldGen("ICSE", "ICSE", { units: "MM", path: "measECWS/i/target/sigmaInstrCentering" }), // target line
    WSSE: fieldGen("WSSE", "WSSE", { units: "MM", path: "measECWS/i/target/sigmaWS" }), // target line
    HLSRID: fieldGen("HLSRID", "HLSR ID", { path: "measECWS/i/target/ID" }), // target ID
    // HLSRLINE: fieldGen("HLSRLINE", "HLSR Line", {
    //   path: "measECWS/i/target/line",
    // }), // target ID
  }; // residuals data
};

// ============================================= //
// ============ WPSR TYPE COLUMNS ============== //
// ============================================= //

// ========== ECWI OBS. TABLE COLUMNS ========== //
export const generateECWIObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    X: fieldGen("X", "X", {
      show: false,
      path: "referencePoint/fVector/0",
      units: "M",
    }), // reference point x coordinate
    Y: fieldGen("Y", "Y", {
      show: false,
      path: "referencePoint/fVector/1",
      units: "M",
    }), // reference point y coordinate
    Z: fieldGen("Z", "Z", {
      show: false,
      path: "referencePoint/fVector/2",
      units: "M",
    }), // reference point z coordinate
    BEAR: fieldGen("BEAR", "Bearing", {
      show: false,
      path: "fWireBearing/fEstimatedValue",
      units: "GON",
    }), // reference bearing value
    SBEAR: fieldGen("SBEAR", "Bearing Sig.", {
      show: false,
      path: "fWireBearing/fEstimatedPrecision",
      units: "CC",
    }), // reference bearing precision
    SLOPE: fieldGen("SLOPE", "Slope", {
      show: false,
      path: "fWireSlope/fEstimatedValue",
      units: "GON",
    }), // reference  slope value
    SSLOPE: fieldGen("SSLOPE", "Slope Sig.", {
      show: false,
      path: "fWireSlope/fEstimatedPrecision",
      units: "CC",
    }), // reference slope precision
    DX: fieldGen("DX", "DX", {
      show: false,
      path: "fWireDx/fEstimatedValue",
      units: "M",
    }), //
    SDX: fieldGen("SDX", "SDX", {
      show: false,
      path: "fWireDx/fEstimatedPrecision",
      units: "MM",
    }), //
    DZ: fieldGen("DZ", "DZ", {
      show: false,
      path: "fWireDz/fEstimatedValue",
      units: "M",
    }), //
    SDZ: fieldGen("SDZ", "SDZ", {
      show: false,
      path: "fWireDz/fEstimatedPrecision",
      units: "MM",
    }), //
    SAGFIX: fieldGen("SAGFIX", "Sag Fix", {
      show: false,
      path: "sagfix",
    }), // sag fix
    SAG: fieldGen("SAG", "Sag", {
      show: false,
      path: "sagAdjustable/fEstimatedValue",
      units: "M",
    }), // sag
    SSAG: fieldGen("SSAG", "Sag Sig.", {
      show: false,
      path: "sagAdjustable/fEstimatedPrecision",
      units: "MM",
    }), // sag precision

    // ========== OBS DATA ========== //
    INSPOS: fieldGen("INSPOS", "String name", {
      size: "L",
      path: "romName",
      link: "INSLINE",
      tooltip: ({ row }) => {
        return (
          <>
            <div>
              <b>Ref. point:</b> X (M): {numFormatter(row.X, 5)} Y (M): {numFormatter(row.Y, 5)} Z (M):{" "}
              {numFormatter(row.Z, 5)}
            </div>
            <div>
              <b>Wire pars.:</b> Bearing. (GON): {numFormatter(row.BEAR, 5)} SBear. (CC): {numFormatter(row.SBEAR, 2)}{" "}
              Slope (GON): {numFormatter(row.SLOPE, 2)} SSlope (CC): {numFormatter(row.SSLOPE, 2)}
            </div>
            <div>
              DX (M): {numFormatter(row.DX, 5)} SDX (MM): {numFormatter(row.SDX, 2)} DZ (M): {numFormatter(row.DZ, 2)}{" "}
              SDZ (MM): {numFormatter(row.SDZ, 2)}
            </div>
            <div>
              SAGFIX {row.SAGFIX ? "true" : "false"} SAG (M): {numFormatter(row.SAG, 5)} SSAG (MM):{" "}
              {numFormatter(row.SSAG, 2)}
            </div>
          </>
        );
      },
    }), // instrument id
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { size: "XXL", link: "TGTLINE", path: "measECWI/i/targetPos" }), // target position
    INSLINE: fieldGen("INSLINE", "ILine", { path: "line", show: false }), // instrument line
    TGTLINE: fieldGen("TGTLINE", "TLine", { path: "lkp:measECWI/i/targetPos", show: false }), // target line
    OBSLINE: fieldGen("OBSLINE", "TLine", { path: "measECWI/i/line", show: false }),
    // ========== ECWI X ========== //
    OBSX: fieldGen("OBSX", "Observed X", { units: "M", path: "measECWI/i/distances/0/fValue", link: "OBSLINE" }), // dist X observations
    SIGX: fieldGen("SIGX", "Sig. X", { units: "MM", path: "measECWI/i/target/sigmaCombinedX" }), // standard deviation X
    CALCX: fieldGen("CALCX", "Calculated X", {
      units: "M",
      path: "!measECWI/i/distances/0/fValue!+!measECWI/i/distancesResiduals/0/fValue",
    }), // calculated dist X
    RESX: fieldGen("RESX", "Residual X", { units: "MM", path: "measECWI/i/distancesResiduals/0/fValue" }), // X dist residual
    RESSIGX: fieldGen("RESSIGX", "Res./Sig. X", {
      units: "-",
      path: "!measECWI/i/distancesResiduals/0/fValue!/!measECWI/i/target/sigmaCombinedX!",
    }), // dist X RES/SIGMA

    // ========== ECWI Z ========== //
    OBSZ: fieldGen("OBSZ", "Observed Z", { units: "M", path: "measECWI/i/distances/1/fValue", link: "OBSLINE" }), // dist Z observations
    SIGZ: fieldGen("SIGZ", "Sigma Z", { units: "MM", path: "measECWI/i/target/sigmaCombinedZ" }), // standard deviation Z
    CALCZ: fieldGen("CALCZ", "Calculated Z", {
      units: "M",
      path: "!measECWI/i/distances/1/fValue!+!measECWI/i/distancesResiduals/1/fValue",
    }), // calculated dist Z
    RESZ: fieldGen("RESZ", "Residual Z", { units: "MM", path: "measECWI/i/distancesResiduals/1/fValue" }), // Z dist residual
    RESSIGZ: fieldGen("RESSIGZ", "Res./Sig. Z", {
      units: "-",
      path: "!measECWI/i/distancesResiduals/1/fValue!/!measECWI/i/target/sigmaCombinedZ!",
    }), // dist Z RES/SIGMA

    // ========== OTHERS ========== //

    XSE: fieldGen("XSE", "XSE", { units: "MM", path: "measECWI/i/target/sigmaX" }), //
    XICSE: fieldGen("XICSE", "XICSE", { units: "MM", path: "measECWI/i/target/sigmaInstrCenteringX" }), //
    ZSE: fieldGen("ZSE", "ZSE", { units: "MM", path: "measECWI/i/target/sigmaZ" }), //
    ZICSE: fieldGen("ZICSE", "ZICSE", { units: "MM", path: "measECWI/i/target/sigmaInstrCenteringZ" }), //

    WISE: fieldGen("WISE", "WISE", { units: "MM", path: "measECWI/i/target/sigmaWire" }), //
    WPSRID: fieldGen("WPSRID", "WPSR ID", { path: "measECWI/i/target/ID" }), // target ID
    // WPSRLINE: fieldGen("WPSRLINE", "WPSR Line", {
    //   path: "measECWI/i/target/line",
    // }), // target ID
  }; // residuals data
};

// ============================================= //
// ============= NO TYPE COLUMNS =============== //
// ============================================= //

// ========== DVER OBS. TABLE COLUMNS ========== //

export const generateDVERObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    TGTPOS1: fieldGen("TGTPOS1", "Ponit 1", { size: "XL", path: "station/fName", border: true, link: "TGTLINE1" }), // instrument id
    TGTPOS: fieldGen("TGTPOS", "Point 2", { size: "XL", path: "targetPos", border: true, link: "TGTLINE" }), // target position
    TGTLINE1: fieldGen("TGTLINE1", "P1Line", { show: false, path: "station/line" }), // instrument line
    TGTLINE: fieldGen("TGTLINE", "P2Line", { show: false, path: "lkp:targetPos" }), // target line
    OBSLINE: fieldGen("OBSLINE", "OBSLINE", { show: false, path: "line" }), // target line

    // ========== DVER DATA ========== //
    OBS: fieldGen("OBS", "Observed", { units: "M", path: "distances/0/fValue", link: "OBSLINE" }), // observed
    SIG: fieldGen("SIG", "Sigma", { units: "MM", path: "fSigmaObsVal" }), // standard deviation
    CALC: fieldGen("CALC", "Calculated", { units: "M", path: "!distances/0/fValue!+!distancesResiduals/0/fValue" }), // calculated
    RES: fieldGen("RES", "Residual", { units: "MM", path: "distancesResiduals/0/fValue" }), // residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", { units: "-", path: "!distancesResiduals/0/fValue!/!fSigmaObsVal!" }), // RES/SIGMA
    DCOR: fieldGen("DCOR", "Dist. Corr.", { units: "M", path: "fDistanceCorrection" }), // dist correction
  };
};

// ========== RADI OBS. TABLE COLUMNS ========== //
export const generateRADIObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { size: "L", path: "targetPos", link: "TGTLINE" }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", { path: "lkp:targetPos", show: false }), // target line
    OBSLINE: fieldGen("OBSLINE", "OLine", { path: "line", show: false }), // target line

    // ========== RADI DATA ========== //
    BEAR: fieldGen("BEAR", "Bearing", {
      link: "OBSLINE",
      units: "GON",
      path: "fAngleCnstr",
      unitConv: angleRad2GONPosf,
    }), // bearing
    SIG: fieldGen("SIG", "Sigma", { units: "MM", path: "fSigmaObsVal", unitConv: distM2MMf }), // sigma
    RES: fieldGen("RES", "Residual", { units: "MM", path: "fResidual", unitConv: distM2MMf }), // residual
    RESSIG: fieldGen("RESSIG", "Res./Sig.", { units: "-", path: "!fResidual!/!fSigmaObsVal!" }), // residual/sigma
    OBSE: fieldGen("OBSE", "Observ. Sig.", { units: "MM", path: "fSigmaObsVal", unitConv: distM2MMf }),
    ACTS: fieldGen("ACTS", "ACTS", { units: "GON", path: "fConstAngleVal", unitConv: angleRad2GONf }),
  };
};

// ========== OBSXYZ OBS. TABLE COLUMNS ========== //
export const generateOBSXYZObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { size: "XL", path: "targetPos", link: "TGTLINE" }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", { path: "lkp:targetPos", show: false }), // target line
    OBSLINE: fieldGen("OBSLINE", "OLine", { path: "line", show: false }), // target line

    // ========== OBSXYZ DATA ========== //
    // == X ==
    RESX: fieldGen("RESX", "Res. X", { units: "MM", path: "fXResidual", unitConv: distM2MMf, link: "OBSLINE" }), // X residual
    SX: fieldGen("SX", "S. X", { units: "MM", path: "fXSigmaObsVal", unitConv: distM2MMf }), // X standard deviation
    RESSIGX: fieldGen("RESSIGX", "Res./Sig. X", { units: "-", path: "!fXResidual!/!fXSigmaObsVal!" }), // X RES/SIGMA
    // == Y ==
    RESY: fieldGen("RESY", "Res. Y", { units: "MM", path: "fYResidual", unitConv: distM2MMf, link: "OBSLINE" }), // Y residual
    SY: fieldGen("SY", "S. Y", { units: "MM", path: "fYSigmaObsVal", unitConv: distM2MMf }), // Y standard deviation
    RESSIGY: fieldGen("RESSIGY", "Res./Sig. Y", { units: "MM", path: "!fYResidual!/!fYSigmaObsVal!" }), // Y RES/SIGMA
    // == Z ==
    RESZ: fieldGen("RESZ", "Res. Z", { units: "MM", path: "fZResidual", unitConv: distM2MMf, link: "OBSLINE" }), // Z residual
    SZ: fieldGen("SZ", "S. Z", { untis: "MM", path: "fZSigmaObsVal", unitConv: distM2MMf }), // Z standard deviation
    RESSIGZ: fieldGen("RESSIGZ", "Res./Sig. Z", { units: "MM", path: "!fZResidual!/!fZSigmaObsVal!" }), // Z RES/SIGMA
  };
};
