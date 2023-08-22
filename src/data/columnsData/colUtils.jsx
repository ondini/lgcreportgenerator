import { pointTypes, DP } from "../constants";
import { distM2HMMf, distM2MMf, angleRad2CCf, angleRad2GONf, angleRad2GONPosf } from "../constants";

import { SPLink, InstrumentTooltip } from "../../components";

// =======================================================
// ============= COLUMNS UTILITY FUNCTIONS ===============
// =======================================================

export const getVarTypeFromFixed = (fixedState) => {
  // compute point type from fixed state
  // convert fixed state T/F values to binary string, parse it as int and use it as index in pointTypes array (containing names)
  const index = parseInt(fixedState.map((i) => (i ? 1 : 0)).join(""), 2);
  return pointTypes[index];
};

export function generateNumFormatter(decimals, factor) {
  // function for generating other function which serves as number formatter for the DataGrid
  return (params) => {
    const roundedValue = Math.round(params.value * factor * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
    return roundedValue;
  };
}

export function numFormatter(number, decimals) {
  return Math.round(number * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
}

export function numFormatterUnits(number, units) {
  let decimals = decGen(units);
  return Math.round(number * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
}

function addTrailingZerosAndFormat(number, decimals) {
  return addTrailingZeros(numFormatter(number, decimals), decimals);
}

function addTrailingZeros(num, numDecs) {
  let str = String(num);

  let decs = str.split(".");
  if (decs.length == 1) {
    str += ".";
  }
  return str.padEnd(numDecs + decs[0].length + 1, "0");
}

// ========================================================================
// ============= DECODERS FROM SYMB VALUES TO TABLE VALUES  ===============
// ========================================================================

function fixedValueDecoder(params, value, cellStyle) {
  let fixed = false;
  if (params.colDef.fixator) {
    fixed =
      params.colDef.fixator[0] === "-" || params.colDef.fixator[0] === "y"
        ? params.row[params.colDef.fixator.slice(1)] === false
        : params.colDef.fixator[0] === "x"
        ? params.row[params.colDef.fixator.slice(1)]
        : params.row[params.colDef.fixator];
  }

  if (fixed) {
    if (params.colDef.fixator[0] === "x" || params.colDef.fixator[0] === "y") {
      value = "FIXED";
      cellStyle = { ...cellStyle, color: "blue" };
    } else {
      cellStyle = { ...cellStyle, color: "#c2c2c2" };
    }
  }
  return [value, cellStyle];
}

function fixedValueDecoderAlt(params, value, cellStyle) {
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
  // function for generating number of decimals for the DataGrid given by units and default precision
  const prec = DP.globalPrecision < 0 ? 0 : DP.globalPrecision > 7 ? 7 : DP.globalPrecision;
  switch (unit) {
    case "M":
    case "GON":
      return prec;
    case "MM":
    case "-": // for res/sig
    case "MM/CM":
    case "MM/KM":
      return prec - 3 > 0 ? prec - 3 : 0;
    case "CC":
      return prec - 4 > 0 ? prec - 4 : 0;
  }
}

function decodeSize(size, args) {
  switch (size) {
    case "S":
      args.flex = 0.6;
      args.minWidth = 70;
      return args;
    case "M":
      args.flex = 1;
      args.minWidth = 110;
      return args;
    case "L":
      args.flex = 1.1;
      args.minWidth = 150;
      return args;
    case "XL":
      args.flex = 1.3;
      args.minWidth = 200;
      return args;
    case "XXL":
      args.flex = 1.5;
      args.minWidth = 250;
      return args;
    default:
      return args;
  }
}

function decodeSizeAlt(size, args) {
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
  switch (unit) {
    case "M":
    case "GON":
      return "M";
    case "MM":
    case "CC":
    case "-": // for res/sig
    case "MM/CM":
    case "MM/KM":
      return "S";
  }
}

function unitConvFromUnit(unit) {
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
  if (params.colDef.tooltip) {
    return (
      <InstrumentTooltip
        title={params.value}
        details={params.colDef.tooltip(params)}
        line={params.colDef.link ? params.row[params.colDef.link] : undefined}
      />
    );
  }

  let cellStyle = { padding: "0.5rem" }; // base style for cell

  let value = params.value === undefined || isNaN(params.value) ? params.value : params.formattedValue;

  if (typeof params.value != "string" && (params.value === undefined || isNaN(params.value))) {
    cellStyle = { padding: 0, backgroundColor: "#f0ebeb", width: "100%", height: "100%", margin: "0px" };
  } else if (typeof params.value != "string" && !isNaN(params.value) && params.value != undefined) {
    value = addTrailingZeros(params.formattedValue, decGen(params.colDef.units));
  }

  [value, cellStyle] = fixedValueDecoder(params, value, cellStyle);

  if (params.colDef.link) {
    const TGTLINE = params.row[params.colDef.link];
    return <SPLink title={value} line={TGTLINE} style={cellStyle} />;
  }

  return <span style={cellStyle}>{value}</span>;
}

export function fieldGenAlt(field, headerName, args = {}) {
  // function generating template for DataGrid column definition
  let defaultArgs = {
    field: field,
    headerName: headerName,
    flex: 0.6,
    minWidth: 70,
    show: true,
    sortable: true,
    units: "",
    unitConv: (x) => x,
    renderHeader: (params) => (
      <>
        <strong>{params.colDef.headerName}</strong>
        <span>{params.colDef.units === "" ? "" : "(" + params.colDef.units.toLowerCase() + ")"}</span>
      </>
    ),
    renderCell: cellRenderer,
  };

  Object.keys(args).forEach((key) => {
    if (key === "units" && args[key] !== "") {
      defaultArgs.valueFormatter = generateNumFormatter(decGen(args[key]), 1);
      defaultArgs.align = "right";
      defaultArgs.type = "number";
    } else if (key === "size") defaultArgs = decodeSize(args[key], defaultArgs);
    else if (key === "border" && args[key] === true) {
      defaultArgs.cellClassName = "border-right--cell";
    }
    defaultArgs[key] = args[key];
  });

  if (!("unitConv" in args) && args["units"] !== "") {
    defaultArgs.unitConv = unitConvFromUnit(args["units"]);
  }

  if (!("size" in args) && args["units"] !== "") {
    defaultArgs = decodeSize(sizeFromUnit(args["units"]), defaultArgs);
  }

  return defaultArgs;
}

function cellRendererAlt(params) {
  if (params.column.columnDef.tooltip) {
    return (
      <InstrumentTooltip
        title={params.renderedCellValue}
        details={params.column.columnDef.tooltip({ row: params.row.original })}
        line={params.column.columnDef.link ? params.row.original[params.column.columnDef.link] : undefined}
      />
    );
  }

  let cellStyle = {}; // base style for cell

  let value = params.renderedCellValue;
  if (
    typeof params.renderedCellValue != "string" &&
    (params.renderedCellValue === undefined || params.renderedCellValue === null || isNaN(params.renderedCellValue))
  ) {
    cellStyle = { padding: 0, backgroundColor: "#f0ebeb", width: "100%", height: "100%", margin: "0px" };
  } else if (
    typeof params.renderedCellValue != "string" &&
    !isNaN(params.renderedCellValue) &&
    params.renderedCellValue != undefined
  ) {
    value = addTrailingZerosAndFormat(params.renderedCellValue, decGen(params.column.columnDef.units));
  }

  [value, cellStyle] = fixedValueDecoderAlt(params, value, cellStyle);

  if (params.column.columnDef.link) {
    const TGTLINE = params.row.original[params.column.columnDef.link];
    return <SPLink title={value} line={TGTLINE} style={cellStyle} />;
  }

  return <span style={cellStyle}>{value}</span>;
}

export function fieldGen(field, headerName, args = {}) {
  // function generating template for DataGrid column definition
  let defaultArgs = {
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
          <span>{column.columnDef.units == "" ? "-" : " (" + column.columnDef.units.toLowerCase() + ")"}</span>
        </div>
      );
    },
    renderCell: cellRenderer,
    Cell: cellRendererAlt,
  };

  Object.keys(args).forEach((key) => {
    if (key === "units" && args[key] !== "") {
      defaultArgs.muiTableBodyCellProps = {
        align: "right",
        sx: { marginRigth: "0.2rem" },
      };
    } else if (key === "border" && args[key] === true) {
      defaultArgs.muiTableBodyCellProps = {
        sx: { borderRight: "1px solid #e0e0e0" },
      };
    }
    if (key === "size") defaultArgs = decodeSizeAlt(args[key], defaultArgs);
    else {
      defaultArgs[key] = args[key];
    }
  });

  if (!("unitConv" in args) && args["units"] !== "") {
    defaultArgs.unitConv = unitConvFromUnit(args["units"]);
  }

  if (!("size" in args) && args["units"] !== "") {
    defaultArgs = decodeSizeAlt(sizeFromUnit(args["units"]), defaultArgs);
  }

  return defaultArgs;
}
