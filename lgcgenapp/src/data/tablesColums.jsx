import InstrumentTooltip from "../components/InstrumentTooltip";
import { angleRad2CC, angleRad2GON, distM2HMM } from "../data/constants";


// =======================================================
// ================== UTILITY FUNCTIONS ==================
// =======================================================

function generateNumFormatter(decimals, factor) {
  // function for generating other function which serves as number formatter for the DataGrid
  return (params) => {
    const roundedValue =
      Math.round(params.value * factor * 10 ** decimals + Number.EPSILON) /
      10 ** decimals;
    return roundedValue;
  };
}

function numFormatter(number, decimals) {
  return Math.round(number * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
}

function fieldGen(field, headerName, args = {}) {
  // function generating template for DataGrid column definition
  let defaultArgs = {
    field: field,
    headerName: headerName,
    flex: 0.5,
    minWidth: 60,
    unitConv: 1,
    show: true,
    sortable: true,
  };

  Object.keys(args).forEach((key) => {
    if (key === "numDecs") {
      defaultArgs.valueFormatter = generateNumFormatter(args[key], 1);
    }
    defaultArgs[key] = args[key];
  });

  return defaultArgs;
}

// =======================================================
// ================= OBS. TABLE COLUMNS ==================
// =======================================================

export const generateTSTNObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    HI: fieldGen("HI", "HI", { show: false }), // instrument height
    SHI: fieldGen("SHI", "SHI", { show: false }), // instrument height precision
    ROT3D: fieldGen("ROT3D", "ROT3D", { show: false }), //
    ACST: fieldGen("ACST", "ACST", { show: false }), //
    V0: fieldGen("V0", "V0", { show: false }), //
    SV0: fieldGen("SV0", "SV0", { show: false }), //

    // ========== OBS DATA ========== //
    id: fieldGen("id", "id", { show: false }), // table id
    INSID: fieldGen("INSID", "Instr. ID", {
      flex: 1,
      minWidth: 100,
      cellClassName: "name-column--cell border-right--cell",
    }), // instrument id
    INSPOS: fieldGen("INSPOS", "Instr. Pos.", {
      felx: 1,
      minWidth: 250,
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
    INSLINE: fieldGen("INSLINE", "ILine", { flex: 0.11, minWidth: 50 }), // instrument line
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { flex: 1, minWidth: 150 }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", {
      flex: 0.11,
      minWidth: 50,
      cellClassName: "border-right--cell",
    }), // target line

    // ========== ANGL ========== //
    OBSANGL: fieldGen("OBSANGL", "Obs. Angle", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // angle observations
    SANGL: fieldGen("SANGL", "S. Ang.", { numDecs: 1 }), // angle standard deviation
    CALCANGL: fieldGen("CALCANGL", "Calc. Angl.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // calculated angle
    RESANGL: fieldGen("RESANGL", "Res. Angl.", { numDecs: 1 }), // angle residual
    RESSIGANGL: fieldGen("RESSIGANGL", "Res./Sig. Angl.", { numDecs: 2 }), // angle RES/SIGMA
    ECARTSANGL: fieldGen("ECARTSANGL", "Ecarts Angl.", {
      numDecs: 2,
      cellClassName: "border-right--cell",
    }), // angle ECARTS

    // ========== ZEND ========== //
    OBSZEND: fieldGen("OBSZEND", "Obs. Zend.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // zenith observations
    SZEND: fieldGen("SZEND", "S. Zend.", { numDecs: 1 }), // zenith standard deviation
    CALCZEND: fieldGen("CALCZEND", "Calc. Zend.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // calculated zenith
    RESZEND: fieldGen("RESZEND", "Res. Zend.", { numDecs: 1 }), // zenith residual
    RESSIGZEND: fieldGen("RESSIGZEND", "Res./Sig. Zend.", { numDecs: 2 }), // zenith RES/SIGMA
    ECARTSZEND: fieldGen("ECARTSZEND", "Ecarts Zend.", {
      numDecs: 2,
      cellClassName: "border-right--cell",
    }), // zenith ECARTS

    // ========== DIST ========== //
    OBSDIST: fieldGen("OBSDIST", "Obs. Dist.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // distance observations
    SDIST: fieldGen("SDIST", "S. Dist.", { numDecs: 1 }), // distance standard deviation
    CALCDIST: fieldGen("CALCDIST", "Calc. Dist.", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
    }), // calculated distance
    RESDIST: fieldGen("RESDIST", "Res. Dist.", { numDecs: 1 }), // distance residual
    RESSIGDIST: fieldGen("RESSIGDIST", "Res./Sig. Dist.", { numDecs: 2 }), // distance RES/SIGMA
  }; // residuals data
};

export const generateECHOObsCols = () => {
  return {
    // ========== TOOLTIP DATA ========== //
    X: fieldGen("X", "X", { show: false, path: 'fECHO/i/fMeasuredPlane/fReferencePoint/fEstimatedValue/fVector/0' }), // reference point x coordinate
    Y: fieldGen("Y", "Y", { show: false, path: 'fECHO/i/fMeasuredPlane/fReferencePoint/fEstimatedValue/fVector/1' }), // reference point y coordinate
    Z: fieldGen("Z", "Z", { show: false, path: 'fECHO/i/fMeasuredPlane/fReferencePoint/fEstimatedValue/fVector/2' }), // reference point z coordinate

    // PX: fieldGen("PX", "PX", { show: false }), // reference string x coordinate
    // PY: fieldGen("PY", "PY", { show: false }), // reference string y coordinate
    // O: fieldGen("O", "O", { show: false }), // reference string orientation
    // SO: fieldGen("SO", "SO", { show: false }), // reference string orientation precision
    // SN: fieldGen("SN", "SN", { show: false }), // reference string normale precision

    // // ========== OBS DATA ========== //
    // id: fieldGen("id", "id", { show: false }), // table id
    // REFPT: fieldGen("REFPT", "Referenve. Pt.", {
    //   flex: 1,
    //   minWidth: 200,
    //   cellClassName: "name-column--cell border-right--cell",
    //   renderCell: ({ row }) => {
    //     return (
    //       <InstrumentTooltip
    //         title={row.REFPT}
    //         details={
    //           <>
    //             <div>
    //               <b>Ref. point:</b> X (M): {numFormatter(row.X, 5)} Y (M):{" "}
    //               {numFormatter(row.Y, 5)} Z (M): {numFormatter(row.Z, 5)}
    //             </div>
    //             <div>
    //               <b>Wire pars.:</b> Orient. (GON): {numFormatter(row.O, 5)}{" "}
    //               SOrient. (CC): {numFormatter(row.SO, 2)} SNormale (MM):{" "}
    //               {numFormatter(row.SN, 2)}
    //             </div>
    //           </>
    //         }
    //       />
    //     );
    //   },
    // }), // instrument id
    // REFLINE: fieldGen("REFLINE", "RLine", { flex: 0.11, minWidth: 50 }), // instrument line
    // TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { flex: 1, minWidth: 200 }), // target position
    // TGTLINE: fieldGen("TGTLINE", "TLine", { flex: 0.11, minWidth: 50 }), // target line

    // ========== ECHO DATA ========== //
    OBS: fieldGen("OBS", "Observed", {
      flex: 0.8,
      minWidth: 100,
      numDecs: 5,
      path: 'fECHO/i/measECHO/i/distances/0/fValue' 
    }), // observations
    SIGMA: fieldGen("SIGMA", "Sigma", { numDecs: 2, path: 'fECHO/i/measECHO/i/target/sigmaCombinedDist', unitConv: distM2HMM }), // standard deviation
    // CALC: fieldGen("CALC", "Calculated", {
    //   flex: 0.8,
    //   minWidth: 100,
    //   numDecs: 5,
    // }), // calculated
    // RES: fieldGen("RES", "Residual", { numDecs: 1 }), // residual
    // RESSIG: fieldGen("RESSIG", "Res./Sig.", { numDecs: 2 }), // RES/SIGMA
  }; // residuals data
};

export const generateOBSXYZObsCols = () => {
  return {
    // ========== OBS DATA ========== //
    id: fieldGen("id", "id", { show: false }), // table id
    TGTPOS: fieldGen("TGTPOS", "Tgt. Pos.", { flex: 1, minWidth: 200 }), // target position
    TGTLINE: fieldGen("TGTLINE", "TLine", { flex: 0.11, minWidth: 50 }), // target line

    // ========== OBSXYZ DATA ========== //
    RESX: fieldGen("RESX", "Res. X", { numDecs: 3 }), // X residual
    SX: fieldGen("SX", "S. X", { numDecs: 3 }), // X standard deviation
    RESSIGX: fieldGen("RESSIGX", "Res./Sig. X", { numDecs: 3 }), // X RES/SIGMA
    RESY: fieldGen("RESY", "Res. Y", { numDecs: 3 }), // Y residual
    SY: fieldGen("SY", "S. Y", { numDecs: 3 }), // Y standard deviation
    RESSIGY: fieldGen("RESSIGY", "Res./Sig. Y", { numDecs: 3 }), // Y RES/SIGMA
    RESZ: fieldGen("RESZ", "Res. Z", { numDecs: 3 }), // Z residual
    SZ: fieldGen("SZ", "S. Z", { numDecs: 3 }), // Z standard deviation
    RESSIGZ: fieldGen("RESSIGZ", "Res./Sig. Z", { numDecs: 3 }), // Z RES/SIGMA
  };
};

// =======================================================
// =============== POINT3D TABLE COLUMNS =================
// =======================================================


// =======================================================
// =============== STATIONS TABLE COLUMNS ================
// =======================================================


export const generateStationsCols = () => {
  return {
    id: fieldGen("id", "id", { show: false }), // table id
    TYPE: fieldGen("TYPE", "Type", { flex: 0.5, minWidth: 50 }),
    TSTN_POS: fieldGen("TSTN_POS", "Station position", {
      flex: 1,
      minWidth: 200,
      cellClassName: "name-column--cell border-right--cell",
    }),
    TSTN_LINE: fieldGen("TSTN_LINE", "Station line"),
    RES_MAX: fieldGen("RES_MAX", "Res. Max.", { numDecs: 2 }),
    RES_MIN: fieldGen("RES_MIN", "Res. Min.", { numDecs: 2 }),
    RES_AVG: fieldGen("RES_AVG", "Res. Avg.", { numDecs: 2 }),
    ECART_TYPE: fieldGen("ECART_TYPE", "Ecart-type", { numDecs: 2 }),
  };
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
