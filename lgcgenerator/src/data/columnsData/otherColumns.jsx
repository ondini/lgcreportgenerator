import { numFormatter, fieldGen } from "./colUtils";

// =======================================================
// =============== POINT3D TABLE COLUMNS =================
// =======================================================

// =======================================================
// =============== STATIONS TABLE COLUMNS ================
// =======================================================

export const generateStationsCols = () => {
  return {
    TYPE: fieldGen("TYPE", "Type", { flex: 0.5, minWidth: 50 }),
    STN_POS: fieldGen("STN_POS", "Station position", {
      flex: 1,
      minWidth: 200,
      cellClassName: "name-column--cell border-right--cell",
    }),
    STN_LINE: fieldGen("STN_LINE", "Station line"),
    RES_MAX: fieldGen("RES_MAX", "Res. Max.", { numDecs: 2 }),
    RES_MIN: fieldGen("RES_MIN", "Res. Min.", { numDecs: 2 }),
    RES_AVG: fieldGen("RES_AVG", "Res. Avg.", { numDecs: 2 }),
    ECART_TYPE: fieldGen("ECART_TYPE", "Ecart-type", { numDecs: 2 }),
  };
};

export const generatePLR3DAnglStationsCols = () => {
  let cols = generateStationsCols();
  cols.STN_POS.path = "";
  cols.STN_LINE.path = "measTST/i/stationLine";
  cols.RES_MAX.path = "measTST/i/residuals/max";
  cols.RES_MIN.path = "measTST/i/residuals/min";
  cols.RES_AVG.path = "measTST/i/residuals/avg";
  cols.ECART_TYPE.path = "measTST/i/residuals/ecartType";
  return cols;
};

export const generateTSTNStationsCols = () => {
  let cols = generateStationsCols();
  cols.STN_POS.path = "measTST/i/stationPos";
  cols.STN_LINE.path = "measTST/i/stationLine";
  cols.RES_MAX.path = "measTST/i/residuals/max";
  cols.RES_MIN.path = "measTST/i/residuals/min";
  cols.RES_AVG.path = "measTST/i/residuals/avg";
  cols.ECART_TYPE.path = "measTST/i/residuals/ecartType";
  return cols;
};

// =======================================================
// ================= FRAMES TABLE COLUMNS ================
// =======================================================

export const generateFrameCols = () => {
  return {
    id: fieldGen("id", "id", { show: false }), // table id
    NAME: fieldGen("NAME", "Name", { flex: 1, minWidth: 200 }),
    TX_INIT: fieldGen("TX_INIT", "TX initial", { numDecs: 6 }),
    TY_INIT: fieldGen("TY_INIT", "TY initial", { numDecs: 6 }),
    TZ_INIT: fieldGen("TZ_INIT", "TZ initial", { numDecs: 6 }),
    RX_INIT: fieldGen("RX_INIT", "RX initial", { numDecs: 6 }),
    RY_INIT: fieldGen("RY_INIT", "RY initial", { numDecs: 6 }),
    RZ_INIT: fieldGen("RZ_INIT", "RZ initial", { numDecs: 6 }),
    TX_CALC: fieldGen("TX_CALC", "TX calculated", { numDecs: 6 }),
    TY_CALC: fieldGen("TY_CALC", "TY calculated", { numDecs: 6 }),
    TZ_CALC: fieldGen("TZ_CALC", "TZ calculated", { numDecs: 6 }),
    RX_CALC: fieldGen("RX_CALC", "RX calculated", { numDecs: 6 }),
    RY_CALC: fieldGen("RY_CALC", "RY calculated", { numDecs: 6 }),
    RZ_CALC: fieldGen("RZ_CALC", "RZ calculated", { numDecs: 6 }),
    TX_SIG: fieldGen("TX_SIG", "TX sigma", { numDecs: 6 }),
    TY_SIG: fieldGen("TY_SIG", "TY sigma", { numDecs: 6 }),
    TZ_SIG: fieldGen("TZ_SIG", "TZ sigma", { numDecs: 6 }),
    RX_SIG: fieldGen("RX_SIG", "RX sigma", { numDecs: 6 }),
    RY_SIG: fieldGen("RY_SIG", "RY sigma", { numDecs: 6 }),
    RZ_SIG: fieldGen("RZ_SIG", "RZ sigma", { numDecs: 6 }),
  };
};
