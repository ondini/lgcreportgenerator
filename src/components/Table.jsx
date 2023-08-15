import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const generateTableStyle = () => {
  return {
    height: "900px",
    marginBottom: "4rem",
    width: "100%",
    // boxShadow: theme.customShadows.Card,
    "& .MuiDataGrid-root": {
      // position: "relative",
      zIndex: 0, // Fix Safari overflow: hidden with border radius
      backgroundColor: "transparent",
      // border: "none",
    },
    "& .MuiDataGrid-cell": {
      // borderBottom: "dashed  1px",
      // borderColor: theme.palette.border.main,
      padding: "0rem",
    },
    "& .border-right--cell": {
      borderRight: "solid  1px #e0e0e0",
    },
    "& .name-column--cell": {
      color: "#20c99a",
    },
    "& .MuiDataGrid-columnHeaders": {
      // borderBottom: "dashed  1px",
      // borderColor: theme.palette.border.main,
    },
    "& .MuiDataGrid-footerContainer": {
      // borderTop: "dashed  1px",
      // borderColor: theme.palette.border.main,
    },
  };
};

// const generateTableInitState = (hiddenFields) => {
//   let hiddenCols = {};
//   hiddenFields.forEach((field) => {
//     if (field !== "__row_group_by_columns_group__") {
//       hiddenCols[field] = false;
//     }
//   });
//   return {
//     columns: {
//       columnVisibilityModel: hiddenCols,
//     },
//   };
// };

const Table = ({ columns, rows, getRowId }) => {
  // const init = generateTableInitState(observations[measType].hideCols);
  return (
    <Box sx={generateTableStyle()}>
      <DataGrid
        getRowId={() => {
          return Math.floor(Math.random() * 100000000000);
        }}
        rows={rows}
        columns={columns}
        pagination
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default Table;
