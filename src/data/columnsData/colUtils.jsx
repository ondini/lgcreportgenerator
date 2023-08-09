import { pointTypes } from "../constants";

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
    unitConv: (x) => x,
    renderCell: (params) => {
      // console.log(params);
      let cellStyle = { padding: "0.5rem" };
      let value = params.value === undefined || isNaN(params.value) ? params.value : params.formattedValue;
      if (typeof params.value != "string" && (params.value === undefined || isNaN(params.value))) {
        cellStyle = { backgroundColor: "#f0ebeb", width: "100%", height: "100%" };
      } else if (typeof params.value != "string" && !isNaN(params.value) && params.value != undefined) {
        cellStyle = { ...cellStyle, textAlign: "right" };
        value = addTrailingZeros(params.formattedValue, params.colDef.numDecs);
      }
      return <span style={cellStyle}>{value}</span>;
    },
  };

  Object.keys(args).forEach((key) => {
    if (key === "numDecs") {
      defaultArgs.valueFormatter = generateNumFormatter(args[key], 1);
      defaultArgs.align = "right";
      defaultArgs.type = "number";
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
