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
  };

  Object.keys(args).forEach((key) => {
    if (key === "numDecs") {
      defaultArgs.valueFormatter = generateNumFormatter(args[key], 1);
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
