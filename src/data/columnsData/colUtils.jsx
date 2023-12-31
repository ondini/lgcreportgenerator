import { pointTypes, DP } from "../constants";
import { distM2MMf, angleRad2CCf, angleRad2GONPosf } from "../constants";

import { SPLink, InstrumentTooltip } from "../../components";

// =======================================================
// ============= COLUMNS UTILITY FUNCTIONS ===============
// =======================================================

export const getVarTypeFromFixed = (fixedState) => {
  /** compute point type from fixed state boolean vector */
  // convert fixed state T/F values to binary string, parse it as int and use it as index in pointTypes array (containing names)
  const index = parseInt(fixedState.map((i) => (i ? 1 : 0)).join(""), 2);
  return pointTypes[index];
};

export function generateNumFormatter(decimals, factor) {
  /** function for generating other function which serves as number formatter for the DataGrid  */
  return (params) => {
    const roundedValue = Math.round(params.value * factor * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
    return roundedValue;
  };
}

export function numFormatter(number, decimals) {
  return Math.round(number * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
}

export function numFormatterUnits(number, units) {
  /** format number based on units */
  let decimals = decGen(units);
  return Math.round(number * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
}

function addTrailingZerosAndFormat(number, decimals) {
  /* round a number and add trailing zeros to it */
  return addTrailingZeros(numFormatter(number, decimals), decimals);
}

function addTrailingZeros(num, numDecs) {
  let str = String(num);
  let decs = str.split(".");
  if (decs.length === 1) {
    str += ".";
  }
  return str.padEnd(numDecs + decs[0].length + 1, "0");
}

// ========================================================================
// ============= DECODERS FROM SYMB VALUES TO TABLE VALUES  ===============
// ========================================================================

function fixedValueDecoder(params, value, cellStyle) {
  /** Returns the value and style of the cell based on the fixed state of the point */
  let fixed = false;
  if (params.column.columnDef.fixator) {
    fixed =
      params.column.columnDef.fixator[0] === "-" || params.column.columnDef.fixator[0] === "y"
        ? params.row.original[params.column.columnDef.fixator.slice(1)] === false
        : params.column.columnDef.fixator[0] === "x"
        ? params.row.original[params.column.columnDef.fixator.slice(1)]
        : params.row.original[params.column.columnDef.fixator];
  }

  if (fixed) {
    if (params.column.columnDef.fixator[0] === "x" || params.column.columnDef.fixator[0] === "y") {
      value = "FIXED";
      cellStyle = { ...cellStyle, color: "blue" };
    } else {
      cellStyle = { ...cellStyle, color: "#c2c2c2" };
    }
  }
  return [value, cellStyle];
}

function decGen(unit) {
  /**  function for generating number of decimals for the DataGrid given by units and default precision */
  const prec = DP.globalPrecision < 0 ? 0 : DP.globalPrecision > 7 ? 7 : DP.globalPrecision;
  switch (unit) {
    case "MM":
    case "-": // for res/sig
    case "MM/CM":
    case "MM/KM":
      return prec - 3 > 0 ? prec - 3 : 0;
    case "CC":
      return prec - 4 > 0 ? prec - 4 : 0;
    case "M":
    case "GON":
    default:
      return prec;
  }
}

function decodeSize(size, args) {
  /** function for generating size of column from symbolic size letter */
  switch (size) {
    case "S":
      args.size = 90;
      return args;
    case "M":
      args.size = 110;
      return args;
    case "L":
      args.size = 150;
      return args;
    case "XL":
      args.size = 210;
      return args;
    case "XXL":
      args.size = 250;
      return args;
    default:
      return args;
  }
}

function sizeFromUnit(unit) {
  /** function for generating symbolic size of column from unit sybmol */
  switch (unit) {
    case "M":
    case "GON":
      return "M";
    case "MM":
    case "CC":
    case "-": // for res/sig
    case "MM/CM":
    case "MM/KM":
    default:
      return "S";
  }
}

function unitConvFromUnit(unit) {
  /** function for generating unit conversion function from unit symbol */
  switch (unit) {
    case "GON":
      return angleRad2GONPosf;
    case "MM":
      return distM2MMf;
    case "CC":
      return angleRad2CCf;
    case "MM/CM":
    case "MM/KM":
      return distM2MMf;
    case "M":
    case "-": // for res/sig
    default:
      return (x) => x;
  }
}

// ========================================================================
// ============= COLUMNS RENDERING AND DEFINITION FUNCTIONS ===============
// ========================================================================

function cellRenderer(params) {
  /** function for rendering cell in Datagrid */

  if (params.column.columnDef.tooltip) {
    // if tooltip is defined, render it
    return (
      <InstrumentTooltip
        title={params.renderedCellValue}
        details={params.column.columnDef.tooltip({ row: params.row.original })}
        line={params.column.columnDef.link ? params.row.original[params.column.columnDef.link] : undefined}
      />
    );
  }

  let cellStyle = {}; // base style for cell

  let value = params.renderedCellValue; // default value for cell -> strings
  if (
    typeof params.renderedCellValue != "string" &&
    (params.renderedCellValue === undefined || params.renderedCellValue === null || isNaN(params.renderedCellValue))
  ) {
    // empty celll
    cellStyle = { padding: 0, backgroundColor: "#f0ebeb", width: "100%", height: "100%", margin: "0px" };
  } else if (
    typeof params.renderedCellValue != "string" &&
    !isNaN(params.renderedCellValue) &&
    params.renderedCellValue !== undefined
  ) {
    // number cell
    value = addTrailingZerosAndFormat(params.renderedCellValue, decGen(params.column.columnDef.units));
  }

  [value, cellStyle] = fixedValueDecoder(params, value, cellStyle); // check if cell is fixed and change value and style accordingly

  if (params.column.columnDef.link) {
    // if link is defined, render it
    const TGTLINE = params.row.original[params.column.columnDef.link];
    return <SPLink title={value} line={TGTLINE} style={cellStyle} />;
  }

  if (params.column.id.indexOf("RESSIG") !== -1) {
    // if cell is res/sig, color it based on value
    if (Math.abs(params.renderedCellValue) > 3) {
      cellStyle = { ...cellStyle, color: "orange" };
    } else if (Math.abs(params.renderedCellValue) > 5) {
      cellStyle = { ...cellStyle, color: "red" };
    }
  }

  return <span style={cellStyle}>{value}</span>;
}

export function fieldGen(field, headerName, args = {}) {
  // function generating template for DataGrid column definition
  let defaultArgs = {
    // default arguments for column definition
    accessorKey: field,
    header: headerName,
    size: 90,
    show: true,
    sortable: true,
    enableFilterMatchHighlighting: false,
    units: "",
    unitConv: (x) => x,
    valueFormatter: (x) => x,

    Header: ({ column }) => {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {" "}
          <span>{column.columnDef.header}</span>
          <span>{column.columnDef.units === "" ? "-" : " (" + column.columnDef.units.toLowerCase() + ")"}</span>
        </div>
      );
    },
    Cell: cellRenderer,
  };

  // replace default arguments with user defined ones
  Object.keys(args).forEach((key) => {
    if (key === "units" && args[key] !== "") {
      // if units are defined, value is numerical, so align to right so that decimapl point is aligned
      defaultArgs.muiTableBodyCellProps = {
        align: "right",
        sx: { marginRigth: "0.2rem" },
      };
    } else if (key === "border" && args[key] === true) {
      // if border is defined, add border to cell
      defaultArgs.muiTableBodyCellProps = {
        sx: { borderRight: "1px solid #e0e0e0" },
      };
    }

    if (key === "size") defaultArgs = decodeSize(args[key], defaultArgs); // decode size of column if provided
    else {
      // otherwise just replace default argument
      defaultArgs[key] = args[key];
    }
  });

  if (!("unitConv" in args) && args["units"] !== "") {
    // if unit conversion function is not defined, generate it from units, if they are defined
    defaultArgs.unitConv = unitConvFromUnit(args["units"]);
  }

  if (!("size" in args) && args["units"] !== "") {
    // if size is not defined, generate it from units, if they are defined
    defaultArgs = decodeSize(sizeFromUnit(args["units"]), defaultArgs);
  }

  return defaultArgs;
}
