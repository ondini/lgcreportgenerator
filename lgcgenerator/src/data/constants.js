export const measurementTypes = ['fTSTN', 'fOBSXYZ', 'fECWS', 'fECHO', 'fRADI', "fEDM"];

export const pointTypes = ['POIN', 'VXY', 'VXZ', 'VX', 'VYZ','VY','VZ', 'CALA'];
export const pointTypesBE = ['POIN', 'VYZ', 'VXZ', 'VZ', 'VXY', 'VY', 'VX', 'CALA']; // point types in Big Endian encoding order


export const navbarWidth = '300px';

const angleRad2CC = 63.662 * 10000; // radians to centesimal circle conv. factor
const angleRad2GON = 63.662; // radians to gon conv. factor
const distM2HMM = 100000; // meters to hundredths of milimeter conv. factor
const distM2MM = 1000; // meters to milimeters conv. factor

export const angleRad2CCf = (value) => { return value * angleRad2CC; };
export const angleRad2GONf = (value) => { return value * angleRad2GON; };
export const distM2HMMf = (value) => { return value * distM2HMM; };
export const distM2MMf = (value) => { return value * distM2MM; };


export const angleRad2GONPosf = (value) => {
  if (value < 0) {
    return value*angleRad2GON + 400;
  }
  return value*angleRad2GON;
};
