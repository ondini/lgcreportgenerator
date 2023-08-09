import { fieldGen, getVarTypeFromFixed } from "./colUtils";
import { distM2MMf } from "../constants";

// =======================================================
// =============== POINT3D TABLE COLUMNS =================
// =======================================================
// path in this part start at root.LGC_DATA.points.point

export const generatePoint3DCols = () => {
  return {
    id: fieldGen("id", "Name", { flex: 1.3, minWidth: 130, path: "fName" }),
    TYPE: fieldGen("TYPE", "Type", { path: "fixedState", unitConv: getVarTypeFromFixed }),
    FRAME: fieldGen("FRAME", "Frame", { flex: 0.4, minWidth: 50, path: "fFramePosition_Name" }),
    X: fieldGen("X", "X", { flex: 1, minWidth: 100, numDecs: 5, path: "fEstimatedValueInRoot/fVector/0" }),
    Y: fieldGen("Y", "Y", { flex: 1, minWidth: 100, numDecs: 5, path: "fEstimatedValueInRoot/fVector/1" }),
    Z: fieldGen("Z", "Z", { flex: 1, minWidth: 100, numDecs: 5, path: "fEstimatedValueInRoot/fVector/2" }),
    H: fieldGen("H", "H", { flex: 1, minWidth: 100, numDecs: 5, path: "fEstimatedHeightInRoot/fValue" }),
    SX: fieldGen("SX", "SX", { flex: 0.4, minWidth: 50, numDecs: 2, path: "fCovarianceMatrixInRoot/0/0" }),
    SY: fieldGen("SY", "SY", { flex: 0.4, minWidth: 50, numDecs: 2, path: "fCovarianceMatrixInRoot/1/1" }),
    SZ: fieldGen("SZ", "SZ", { flex: 0.4, minWidth: 50, numDecs: 2, path: "fCovarianceMatrixInRoot/2/2" }),
    DX: fieldGen("DX", "DX", {
      numDecs: 2,
      unitConv: distM2MMf,
      path: "!fEstimatedValueInRoot/fVector/0!-!fProvisionalValueInRoot/fVector/0!",
    }),
    DY: fieldGen("DY", "DY", {
      numDecs: 2,
      unitConv: distM2MMf,
      path: "!fEstimatedValueInRoot/fVector/1!-!fProvisionalValueInRoot/fVector/1!",
    }),
    DZ: fieldGen("DZ", "DZ", {
      numDecs: 2,
      unitConv: distM2MMf,
      path: "!fEstimatedValueInRoot/fVector/2!-!fProvisionalValueInRoot/fVector/2!",
    }),
  };
};

// =======================================================
// =============== STATIONS TABLE COLUMNS ================
// =======================================================

export const generateStationsCols = () => {
  return {
    // ================== TOOLTIP INFO ==================

    // ================== STATION INFO ==================
    TYPE: fieldGen("TYPE", "Type", { flex: 0.5, minWidth: 50, keyword: "fObsText" }), // temporary, is replaced individually
    STN_POS: fieldGen("STN_POS", "Station position", {
      flex: 1,
      minWidth: 200,
      cellClassName: "name-column--cell border-right--cell",
      keyword: "fObsText",
    }),
    // STN_LINE: fieldGen("STN_LINE", "Station line"),
    RES_MAX: fieldGen("RES_MAX", "Res. Max.", { numDecs: 2, keyword: "fResMax" }),
    RES_MIN: fieldGen("RES_MIN", "Res. Min.", { numDecs: 2, keyword: "fResMin" }),
    RES_AVG: fieldGen("RES_AVG", "Res. Avg.", { numDecs: 2, keyword: "fMean" }),
    ECART_TYPE: fieldGen("ECART_TYPE", "Ecart-type", { numDecs: 2, keyword: "fStdev" }),
  };
};

// =======================================================
// ================= FRAMES TABLE COLUMNS ================
// =======================================================

export const generateFrameCols = () => {
  return {
    NAME: fieldGen("NAME", "Name", { flex: 1, minWidth: 200, path: "frame/name" }),
    TX_INIT: fieldGen("TX_INIT", "TX initial", { numDecs: 6, path: "frame/fProvParameter/0" }),
    TY_INIT: fieldGen("TY_INIT", "TY initial", { numDecs: 6, path: "frame/fProvParameter/1" }),
    TZ_INIT: fieldGen("TZ_INIT", "TZ initial", { numDecs: 6, path: "frame/fProvParameter/2" }),
    RX_INIT: fieldGen("RX_INIT", "RX initial", { numDecs: 6, path: "frame/fProvParameter/3" }),
    RY_INIT: fieldGen("RY_INIT", "RY initial", { numDecs: 6, path: "frame/fProvParameter/4" }),
    RZ_INIT: fieldGen("RZ_INIT", "RZ initial", { numDecs: 6, path: "frame/fProvParameter/5" }),
    TX_CALC: fieldGen("TX_CALC", "TX calculated", { numDecs: 6, path: "frame/fEstParameter/0" }),
    TY_CALC: fieldGen("TY_CALC", "TY calculated", { numDecs: 6, path: "frame/fEstParameter/1" }),
    TZ_CALC: fieldGen("TZ_CALC", "TZ calculated", { numDecs: 6, path: "frame/fEstParameter/2" }),
    RX_CALC: fieldGen("RX_CALC", "RX calculated", { numDecs: 6, path: "frame/fEstParameter/3" }),
    RY_CALC: fieldGen("RY_CALC", "RY calculated", { numDecs: 6, path: "frame/fEstParameter/4" }),
    RZ_CALC: fieldGen("RZ_CALC", "RZ calculated", { numDecs: 6, path: "frame/fEstParameter/5" }),
    TX_SIG: fieldGen("TX_SIG", "TX sigma", { numDecs: 6, path: "frame/fEstPrecision/0" }),
    TY_SIG: fieldGen("TY_SIG", "TY sigma", { numDecs: 6, path: "frame/fEstPrecision/1" }),
    TZ_SIG: fieldGen("TZ_SIG", "TZ sigma", { numDecs: 6, path: "frame/fEstPrecision/2" }),
    RX_SIG: fieldGen("RX_SIG", "RX sigma", { numDecs: 6, path: "frame/fEstPrecision/3" }),
    RY_SIG: fieldGen("RY_SIG", "RY sigma", { numDecs: 6, path: "frame/fEstPrecision/4" }),
    RZ_SIG: fieldGen("RZ_SIG", "RZ sigma", { numDecs: 6, path: "frame/fEstPrecision/5" }),
  };
};
