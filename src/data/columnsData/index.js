import { 
    generateTSTNPaths,
    generateTSTNObsCols, 
    generateORIEObsCols,
    generateECHOObsCols,
    generateOBSXYZObsCols,
    generateRADIObsCols,
    generateDSPTObsCols,
    generateECWSObsCols,
    generateECWIObsCols,
    generateDVERObsCols,
    generateDLEVObsCols,
    generateINCLYObsCols,
    generateUVDObsCols,
    generateUVECObsCols
 } from './obsTableCols.jsx';

 import {
  generateMeasurementsCols,
    generateFrameCols,
    generatePoint3DCols,
 } from './otherColumns.jsx';


export { 
    generateTSTNPaths,
    generateTSTNObsCols, 

    
    generateMeasurementsCols,
    generateFrameCols,
    generatePoint3DCols,
};

export const generateObsCols = (type) => {
    switch (type) {
      case "fOBSXYZ":
        return generateOBSXYZObsCols();
      case "fECHO":
        return generateECHOObsCols();
      case "fECWS":
        return generateECWSObsCols();
      case "fECWI":
        return generateECWIObsCols();
      case "fEDM":
        return generateDSPTObsCols();
      case "fRADI":
        return generateRADIObsCols();
      case "fORIE":
        return generateORIEObsCols();
      case "fDVER":
        return generateDVERObsCols();
      case "fLEVEL":
        return generateDLEVObsCols();
      case "fINCLY":
        return generateINCLYObsCols();
      case "UVD":
        return generateUVDObsCols();
      case "UVEC":
        return generateUVECObsCols();
      default:
        return {};
    }
  };