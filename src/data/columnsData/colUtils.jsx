import { pointTypes, DP } from "../constants";
import { linkPathPlaceholder } from "../constants";

// =======================================================
// ============= COLUMNS UTILITY FUNCTIONS ===============
// =======================================================

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

function addTrailingZeros(num, numDecs) {
  let str = String(num);

  let decs = str.split(".");
  if (decs.length == 1) {
    str += ".";
  }
  return str.padEnd(numDecs + decs[0].length + 1, "0");
}

export function fieldGen(field, headerName, args = {}) {
  // function generating template for DataGrid column definition
  let defaultArgs = {
    field: field,
    headerName: headerName,
    flex: 0.5,
    minWidth: 60,
    show: true,
    sortable: true,
    units: "",
    unitConv: (x) => x,
    renderHeader: (params) => (
      <>
        <strong>{params.colDef.headerName}</strong>
        <span>{params.colDef.units == "" ? "" : "(" + params.colDef.units + ")"}</span>
      </>
    ),

    renderCell: (params) => {
      let cellStyle = { padding: "0.5rem" };
      let value = params.value === undefined || isNaN(params.value) ? params.value : params.formattedValue;
      if (typeof params.value != "string" && (params.value === undefined || isNaN(params.value))) {
        cellStyle = { backgroundColor: "#f0ebeb", width: "100%", height: "100%" };
      } else if (typeof params.value != "string" && !isNaN(params.value) && params.value != undefined) {
        cellStyle = { ...cellStyle, textAlign: "right" };
        value = addTrailingZeros(params.formattedValue, decGen(params.colDef.units));
      }
      let fixed = false;
      if (params.colDef.fixator) {
        fixed =
          params.colDef.fixator[0] === "-"
            ? params.row[params.colDef.fixator.slice(1)] === false
            : params.colDef.fixator[0] === "x"
            ? params.row[params.colDef.fixator.slice(1)]
            : params.row[params.colDef.fixator];
      }
      if (fixed) {
        if (params.colDef.fixator[0] === "x") {
          value = "";
          cellStyle = { backgroundColor: "#f0ebeb", width: "100%", height: "100%" };
        } else {
          cellStyle = { ...cellStyle, color: "#c2c2c2" };
        }
      }

      if (params.colDef.link) {
        const TGTLINE = params.row[params.colDef.link];
        return (
          <a style={cellStyle} href={`surveypad://link//${linkPathPlaceholder},${TGTLINE}`}>
            {params.value}
          </a>
        );
      }
      return <span style={cellStyle}>{value}</span>;
    },
  };

  Object.keys(args).forEach((key) => {
    if (key === "numDecs") {
      defaultArgs.valueFormatter = generateNumFormatter(args[key], 1);
      defaultArgs.align = "right";
      defaultArgs.type = "number";
    } else if (key === "units" && args[key] != "") {
      defaultArgs.valueFormatter = generateNumFormatter(decGen(args[key]), 1);
      defaultArgs.align = "right";
      defaultArgs.type = "number";
    }
    defaultArgs[key] = args[key];
  });

  return defaultArgs;
}

function decGen(unit) {
  const prec = DP.defaultPrecision < 0 ? 0 : DP.defaultPrecision > 7 ? 7 : DP.defaultPrecision;
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

export function fieldGene(field, headerName, args = {}) {
  // function generating template for DataGrid column definition
  let defaultArgs = {
    accessorKey: field,
    header: headerName,
    flex: 0.5,
    size: 100,
    show: true,
    sortable: true,
    units: "",
    muiTableHeadCellProps: {
      align: "center",
    },
    unitConv: (x) => x,

    Header: ({ column }) => {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {" "}
          <strong>{column.columnDef.header}</strong>
          <span>{column.columnDef.units == "" ? "-" : " (" + column.columnDef.units + ")"}</span>
        </div>
      );
    },

    Cell: (params) => {
      let cellStyle = {};
      let value = params.renderedCellValue === undefined ? "aaa" : params.renderedCellValue;
      if (params.renderedCellValue === undefined || isNaN(params.renderedCellValue)) {
        cellStyle = { backgroundColor: "#f0ebeb", width: "100%" };
      } else if (typeof params.renderedCellValue != "string") {
        cellStyle = { ...cellStyle, textAlign: "right" };
        value = addTrailingZeros(
          numFormatter(params.renderedCellValue, params.column.columnDef.numDecs),
          params.column.columnDef.numDecs
        );
      }
      return <span style={cellStyle}>{value}</span>;
    },
  };

  Object.keys(args).forEach((key) => {
    if (key === "numDecs") {
      defaultArgs["muiTableBodyCellProps"] = {
        align: "right",
      };
    }
    defaultArgs[key] = args[key];
  });

  return defaultArgs;
}

export const getVarTypeFromFixed = (fixedState) => {
  // compute point type from fixed state
  // convert fixed state T/F values to binary string, parse it as int and use it as index in pointTypes array (containing names)
  const index = parseInt(fixedState.map((i) => (i ? 1 : 0)).join(""), 2);
  return pointTypes[index];
};
