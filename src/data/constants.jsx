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
export const NAVBAR_WIDTH_WIDE = "200px";

export const DP = { defaultPrecision: 6 }; // done this way, so that it is replacable after compilation
export const linkPathPlaceholder = "linkPathPlaceholder";

const angleRad2CC = 63.662 * 10000; // radians to centesimal circle conv. factor
const angleRad2GON = 63.662; // radians to gon conv. factor
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
