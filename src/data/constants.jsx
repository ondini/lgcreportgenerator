export const measurementTypes = [
  "fTSTN",
  "fOBSXYZ",
  "fECWS",
  "fECWI",
  "fECHO",
  "fRADI",
  "fEDM",
  "fORIE",
  "fDVER",
  "fLEVEL",
  "fINCLY",
  "fCAM",
];

export const pointTypes = ["POIN", "VXY", "VXZ", "VX", "VYZ", "VY", "VZ", "CALA"];

export const noSrcMeasTypes = ["fOBSXYZ", "fRADI", "fDVER"]; // measurement types that do not have a source instrument

export const DP = { globalPrecision: 6 }; // done this way, so that it is replacable after compilation
export const linkPathPlaceholder = "linkPathPlaceholder";

// ======= DISPLAY CONSTANTS =======

export const NAVBAR_WIDTH_WIDE = "200px";
export const PLOT_3D_WIDTH = 1100;
export const PLOT_3D_HEIGHT = 1000;

// ======= UNIT CONVERSION FACTORS =======

const angleRad2GON = 63.6619772368; // radians to gon conv. factor
const angleRad2CC = angleRad2GON * 10000; // radians to centesimal circle conv. factor
const distM2HMM = 100000; // meters to hundredths of milimeter conv. factor
const distM2MM = 1000; // meters to milimeters conv. factor

export const angleRad2CCf = (value) => {
  return value * angleRad2CC;
};
export const angleRad2GONf = (value) => {
  return value * angleRad2GON;
};
export const distM2HMMf = (value) => {
  return value * distM2HMM;
};
export const distM2MMf = (value) => {
  return value * distM2MM;
};

export const angleRad2GONPosf = (value) => {
  if (value < 0) {
    return value * angleRad2GON + 400;
  }
  return value * angleRad2GON;
};
