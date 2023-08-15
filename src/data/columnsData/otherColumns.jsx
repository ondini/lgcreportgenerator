import { fieldGen, getVarTypeFromFixed, fieldGene } from "./colUtils";
import { distM2MMf } from "../constants";
import { linkPathPlaceholder } from "../constants";

// =======================================================
// =============== POINT3D TABLE COLUMNS =================
// =======================================================
// path in this part start at root.LGC_DATA.points.point

export const generatePoint3DCols = () => {
  return {
    NAME: fieldGen("NAME", "Name", { flex: 1.3, minWidth: 130, path: "fName", link: "LINE" }),
    LINE: fieldGen("LINE", "Line", { path: "line", show: false }),
    TYPE: fieldGen("TYPE", "Type", { path: "fixedState", unitConv: getVarTypeFromFixed }),
    FRAME: fieldGen("FRAME", "Frame", { flex: 0.4, minWidth: 50, path: "fFramePosition_Name", units: "M" }),
    X: fieldGen("X", "X", { flex: 1, minWidth: 100, path: "fEstimatedValueInRoot/fVector/0", units: "M" }),
    Y: fieldGen("Y", "Y", { flex: 1, minWidth: 100, path: "fEstimatedValueInRoot/fVector/1", units: "M" }),
    Z: fieldGen("Z", "Z", { flex: 1, minWidth: 100, path: "fEstimatedValueInRoot/fVector/2", units: "M" }),
    H: fieldGen("H", "H", { flex: 1, minWidth: 100, path: "fEstimatedHeightInRoot/fValue", units: "M" }),
    SX: fieldGen("SX", "SX", { path: "fCovarianceMatrixInRoot/0/0", units: "MM" }),
    SY: fieldGen("SY", "SY", { path: "fCovarianceMatrixInRoot/1/1", units: "MM" }),
    SZ: fieldGen("SZ", "SZ", { path: "fCovarianceMatrixInRoot/2/2", units: "MM" }),
    DX: fieldGen("DX", "DX", {
      unitConv: distM2MMf,
      path: "!fEstimatedValueInRoot/fVector/0!-!fProvisionalValueInRoot/fVector/0!",
      units: "MM",
    }),
    DY: fieldGen("DY", "DY", {
      unitConv: distM2MMf,
      path: "!fEstimatedValueInRoot/fVector/1!-!fProvisionalValueInRoot/fVector/1!",
      units: "MM",
    }),
    DZ: fieldGen("DZ", "DZ", {
      unitConv: distM2MMf,
      path: "!fEstimatedValueInRoot/fVector/2!-!fProvisionalValueInRoot/fVector/2!",
      units: "MM",
    }),
  };
};

export const generatePoint3DCols2 = () => {
  return {
    id: fieldGene("id", "Name", { flex: 1.3, minWidth: 130, path: "fName" }),
    TYPE: fieldGene("TYPE", "Type", { path: "fixedState", unitConv: getVarTypeFromFixed, show: false }),
    FRAME: fieldGene("FRAME", "Frame", { flex: 0.4, minWidth: 50, path: "fFramePosition_Name" }),
    X: fieldGene("X", "X", { flex: 1, minWidth: 100, numDecs: 5, path: "fEstimatedValueInRoot/fVector/0" }),
    Y: fieldGene("Y", "Y", { flex: 1, minWidth: 100, numDecs: 5, path: "fEstimatedValueInRoot/fVector/1" }),
    Z: fieldGene("Z", "Z", { flex: 1, minWidth: 100, numDecs: 5, path: "fEstimatedValueInRoot/fVector/2" }),
    H: fieldGene("H", "H", { flex: 1, minWidth: 100, numDecs: 5, path: "fEstimatedHeightInRoot/fValue" }),
    SX: fieldGene("SX", "SX", { flex: 0.4, minWidth: 50, numDecs: 2, path: "fCovarianceMatrixInRoot/0/0" }),
    SY: fieldGene("SY", "SY", { flex: 0.4, minWidth: 50, numDecs: 2, path: "fCovarianceMatrixInRoot/1/1" }),
    SZ: fieldGene("SZ", "SZ", { flex: 0.4, minWidth: 50, numDecs: 2, path: "fCovarianceMatrixInRoot/2/2" }),
    DX: fieldGene("DX", "DX", {
      unitConv: distM2MMf,
      path: "!fEstimatedValueInRoot/fVector/0!-!fProvisionalValueInRoot/fVector/0!",
      units: "MM",
    }),
    DY: fieldGene("DY", "DY", {
      numDecs: 2,
      unitConv: distM2MMf,
      path: "!fEstimatedValueInRoot/fVector/1!-!fProvisionalValueInRoot/fVector/1!",
    }),
    DZ: fieldGene("DZ", "DZ", {
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
    NAME: fieldGen("NAME", "Name", { flex: 1, minWidth: 200, path: "frame/name" }),
    LINE: fieldGen("LINE", "Line", {
      path: "frame/line",
      renderCell: ({ row: { LINE } }) => {
        return <a href={`surveypad://link//${linkPathPlaceholder},${LINE}`}>{LINE}</a>;
      },
    }),
    TX_INIT: fieldGen("TX_INIT", "TX initial", { units: "M", path: "frame/fProvParameter/0" }),
    TY_INIT: fieldGen("TY_INIT", "TY initial", { units: "M", path: "frame/fProvParameter/1" }),
    TZ_INIT: fieldGen("TZ_INIT", "TZ initial", { units: "M", path: "frame/fProvParameter/2" }),
    RX_INIT: fieldGen("RX_INIT", "RX initial", { units: "GON", path: "frame/fProvParameter/3" }),
    RY_INIT: fieldGen("RY_INIT", "RY initial", { units: "GON", path: "frame/fProvParameter/4" }),
    RZ_INIT: fieldGen("RZ_INIT", "RZ initial", { units: "GON", path: "frame/fProvParameter/5" }),
    TX_CALC: fieldGen("TX_CALC", "TX calculated", { units: "M", path: "frame/fEstParameter/0", fixator: "TX_FIXED" }),
    TY_CALC: fieldGen("TY_CALC", "TY calculated", { units: "M", path: "frame/fEstParameter/1", fixator: "TY_FIXED" }),
    TZ_CALC: fieldGen("TZ_CALC", "TZ calculated", { units: "M", path: "frame/fEstParameter/2", fixator: "TZ_FIXED" }),
    RX_CALC: fieldGen("RX_CALC", "RX calculated", { units: "GON", path: "frame/fEstParameter/3", fixator: "RX_FIXED" }),
    RY_CALC: fieldGen("RY_CALC", "RY calculated", { units: "GON", path: "frame/fEstParameter/4", fixator: "RY_FIXED" }),
    RZ_CALC: fieldGen("RZ_CALC", "RZ calculated", { units: "GON", path: "frame/fEstParameter/5", fixator: "RZ_FIXED" }),
    TX_SIG: fieldGen("TX_SIG", "TX sigma", { units: "MM", path: "frame/fEstPrecision/0", fixator: "xTX_FIXED" }),
    TY_SIG: fieldGen("TY_SIG", "TY sigma", { units: "MM", path: "frame/fEstPrecision/1", fixator: "xTY_FIXED" }),
    TZ_SIG: fieldGen("TZ_SIG", "TZ sigma", { units: "MM", path: "frame/fEstPrecision/2", fixator: "xTZ_FIXED" }),
    RX_SIG: fieldGen("RX_SIG", "RX sigma", { units: "CC", path: "frame/fEstPrecision/3", fixator: "xRX_FIXED" }),
    RY_SIG: fieldGen("RY_SIG", "RY sigma", { units: "CC", path: "frame/fEstPrecision/4", fixator: "xRY_FIXED" }),
    RZ_SIG: fieldGen("RZ_SIG", "RZ sigma", { units: "CC", path: "frame/fEstPrecision/5", fixator: "xRZ_FIXED" }),
    TX_FIXED: fieldGene("TX_FIXED", "TX_FIXED", { path: "frame/fixedTranfParam/0", show: false }),
    TY_FIXED: fieldGene("TY_FIXED", "TY_FIXED", { path: "frame/fixedTranfParam/1", show: false }),
    TZ_FIXED: fieldGene("TZ_FIXED", "TZ_FIXED", { path: "frame/fixedTranfParam/2", show: false }),
    RX_FIXED: fieldGene("RX_FIXED", "RX_FIXED", { path: "frame/fixedTranfParam/3", show: false }),
    RY_FIXED: fieldGene("RY_FIXED", "RY_FIXED", { path: "frame/fixedTranfParam/4", show: false }),
    RZ_FIXED: fieldGene("RZ_FIXED", "RZ_FIXED", { path: "frame/fixedTranfParam/5", show: false }),
  };
};
