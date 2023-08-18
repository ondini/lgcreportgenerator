import { fieldGen, getVarTypeFromFixed } from "./colUtils";
import { distM2MMf } from "../constants";
import { linkPathPlaceholder } from "../constants";

// =======================================================
// =============== POINT3D TABLE COLUMNS =================
// =======================================================
// path in this part start at root.LGC_DATA.points.point

export const generatePoint3DCols = () => {
  return {
    NAME: fieldGen("NAME", "Name", { size: "XL", path: "fName", link: "LINE" }),
    LINE: fieldGen("LINE", "Line", { path: "line", show: false }),
    TYPE: fieldGen("TYPE", "Type", { path: "fixedState", unitConv: getVarTypeFromFixed }),
    FRAME: fieldGen("FRAME", "Frame", { size: "XL", path: "fFramePosition_Name", border: true }),
    X: fieldGen("X", "X", { size: "L", path: "fEstimatedValueInRoot/fVector/0", units: "M" }),
    Y: fieldGen("Y", "Y", { size: "L", path: "fEstimatedValueInRoot/fVector/1", units: "M" }),
    Z: fieldGen("Z", "Z", { size: "L", path: "fEstimatedValueInRoot/fVector/2", units: "M" }),
    H: fieldGen("H", "H", {
      size: "L",
      path: "fEstimatedHeightInRoot/fValue",
      units: "M",
      border: true,
    }),
    SX: fieldGen("SX", "SX", { path: "fCovarianceMatrixInRoot/0/0", units: "MM" }),
    SY: fieldGen("SY", "SY", { path: "fCovarianceMatrixInRoot/1/1", units: "MM" }),
    SZ: fieldGen("SZ", "SZ", { path: "fCovarianceMatrixInRoot/2/2", units: "MM", border: true }),
    DX: fieldGen("DX", "DX", {
      path: "!fEstimatedValueInRoot/fVector/0!-!fProvisionalValueInRoot/fVector/0!",
      units: "MM",
    }),
    DY: fieldGen("DY", "DY", {
      path: "!fEstimatedValueInRoot/fVector/1!-!fProvisionalValueInRoot/fVector/1!",
      units: "MM",
    }),
    DZ: fieldGen("DZ", "DZ", {
      path: "!fEstimatedValueInRoot/fVector/2!-!fProvisionalValueInRoot/fVector/2!",
      units: "MM",
    }),
  };
};

// =======================================================
// =============== STATIONS TABLE COLUMNS ================
// =======================================================

export const generateMeasurementsCols = () => {
  return {
    // ================== TOOLTIP INFO ==================

    // ================== STATION INFO ==================
    MMT_POS: fieldGen("MMT_POS", "Msmt. position", {
      size: "L",
      link: "MMT_LINE",
      keyword: "fObsText",
      border: true,
    }),
    MMT_LINE: fieldGen("MMT_LINE", "Msmt. line", { show: false }),
    TYPE: fieldGen("TYPE", "Type", { keyword: "fObsText", border: true }), // temporary, is replaced individually
    RES_MAX: fieldGen("RES_MAX", "Res. Max.", { units: "MM", keyword: "fResMax" }),
    RES_MIN: fieldGen("RES_MIN", "Res. Min.", { units: "MM", keyword: "fResMin" }),
    RES_AVG: fieldGen("RES_AVG", "Res. Avg.", { units: "MM", keyword: "fMean" }),
    ECART_TYPE: fieldGen("ECART_TYPE", "Ecart-type", { units: "MM", keyword: "fStdev" }),
  };
};

// =======================================================
// ================= FRAMES TABLE COLUMNS ================
// =======================================================

export const generateFrameCols = () => {
  return {
    NAME: fieldGen("NAME", "Name", { size: "XL", path: "frame/name", link: "LINE" }),
    LINE: fieldGen("LINE", "Line", { path: "frame/line", show: false }),
    TX_INIT: fieldGen("TX_INIT", "TX initial", { units: "M", path: "frame/fProvParameter/0", size: "M" }),
    TY_INIT: fieldGen("TY_INIT", "TY initial", { units: "M", path: "frame/fProvParameter/1", size: "M" }),
    TZ_INIT: fieldGen("TZ_INIT", "TZ initial", { units: "M", path: "frame/fProvParameter/2", size: "M" }),
    RX_INIT: fieldGen("RX_INIT", "RX initial", { units: "GON", path: "frame/fProvParameter/3", size: "M" }),
    RY_INIT: fieldGen("RY_INIT", "RY initial", { units: "GON", path: "frame/fProvParameter/4", size: "M" }),
    RZ_INIT: fieldGen("RZ_INIT", "RZ initial", { units: "GON", path: "frame/fProvParameter/5", size: "M" }),
    TX_CALC: fieldGen("TX_CALC", "TX calculated", {
      units: "M",
      path: "frame/fEstParameter/0",
      fixator: "TX_FIXED",
      size: "M",
    }),
    TY_CALC: fieldGen("TY_CALC", "TY calculated", {
      units: "M",
      path: "frame/fEstParameter/1",
      fixator: "TY_FIXED",
      size: "M",
    }),
    TZ_CALC: fieldGen("TZ_CALC", "TZ calculated", {
      units: "M",
      path: "frame/fEstParameter/2",
      fixator: "TZ_FIXED",
      size: "M",
    }),
    RX_CALC: fieldGen("RX_CALC", "RX calculated", {
      units: "GON",
      path: "frame/fEstParameter/3",
      fixator: "RX_FIXED",
      size: "M",
    }),
    RY_CALC: fieldGen("RY_CALC", "RY calculated", {
      units: "GON",
      path: "frame/fEstParameter/4",
      fixator: "RY_FIXED",
      size: "M",
    }),
    RZ_CALC: fieldGen("RZ_CALC", "RZ calculated", {
      units: "GON",
      path: "frame/fEstParameter/5",
      fixator: "RZ_FIXED",
      size: "M",
    }),
    TX_SIG: fieldGen("TX_SIG", "TX sigma", { units: "MM", path: "frame/fEstPrecision/0", fixator: "xTX_FIXED" }),
    TY_SIG: fieldGen("TY_SIG", "TY sigma", { units: "MM", path: "frame/fEstPrecision/1", fixator: "xTY_FIXED" }),
    TZ_SIG: fieldGen("TZ_SIG", "TZ sigma", { units: "MM", path: "frame/fEstPrecision/2", fixator: "xTZ_FIXED" }),
    RX_SIG: fieldGen("RX_SIG", "RX sigma", { units: "CC", path: "frame/fEstPrecision/3", fixator: "xRX_FIXED" }),
    RY_SIG: fieldGen("RY_SIG", "RY sigma", { units: "CC", path: "frame/fEstPrecision/4", fixator: "xRY_FIXED" }),
    RZ_SIG: fieldGen("RZ_SIG", "RZ sigma", { units: "CC", path: "frame/fEstPrecision/5", fixator: "xRZ_FIXED" }),
    TX_FIXED: fieldGen("TX_FIXED", "TX_FIXED", { path: "frame/fixedTranfParam/0", show: false }),
    TY_FIXED: fieldGen("TY_FIXED", "TY_FIXED", { path: "frame/fixedTranfParam/1", show: false }),
    TZ_FIXED: fieldGen("TZ_FIXED", "TZ_FIXED", { path: "frame/fixedTranfParam/2", show: false }),
    RX_FIXED: fieldGen("RX_FIXED", "RX_FIXED", { path: "frame/fixedTranfParam/3", show: false }),
    RY_FIXED: fieldGen("RY_FIXED", "RY_FIXED", { path: "frame/fixedTranfParam/4", show: false }),
    RZ_FIXED: fieldGen("RZ_FIXED", "RZ_FIXED", { path: "frame/fixedTranfParam/5", show: false }),
  };
};
