import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { getObsData } from "../utils/allDataProcessing";
import { generateNumFormatter } from "../utils/dataProcessing";
import Title from "../components/Title";
import { useState, useEffect } from "react";

const generateTableStyle = () => {
  return {
    height: 800,
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

const generateTableInitState = (hiddenFields) => {
  let hiddenCols = {};
  hiddenFields.forEach((field) => {
    if (field !== "__row_group_by_columns_group__") {
      hiddenCols[field] = false;
    }
  });
  return {
    columns: {
      columnVisibilityModel: hiddenCols,
    },
  };
};

function getTogglableColumnsFun(hiddenFields) {
  return (columns) => {
    return columns
      .filter((column) => !hiddenFields.includes(column.field))
      .map((column) => column.field);
  };
}

export default function Observations({ data }) {
  const observations = getObsData(data.LGC_DATA); // get the residuals data from the LGC_DATA object
  const measTypes = Object.keys(observations); // get all the used measurement types from the residuals data

  const createTable = (measType) => {
    // function that creates the histogram components for each of the residuals of the selected measurement type
    const getTogglableColumns = getTogglableColumnsFun(
      observations[measType].hideCols
    );
    const init = generateTableInitState(observations[measType].hideCols);
    return (
      <Box sx={generateTableStyle()}>
        <DataGrid
          rows={observations[measType].data}
          columns={observations[measType].columnss}
          hideFooter
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          // slotProps={{
          //   columnsPanel: {
          //     getTogglableColumns,
          //   },
          // }}
          // initialState={init}
        />
      </Box>
    );
  };

  let [table, setTable] = useState([]);
  let [key, setKey] = useState(measTypes[0]); // state of the currently active measurement type

  useEffect(() => {
    setTable(createTable(measTypes.includes("fTSTN") ? "fTSTN" : "fOBSXYZ"));
  }, [key]);

  let measTypeButtons = measTypes.map((key) => {
    // create the measurement type buttons
    return (
      <button
        key={key}
        className="histsec-nav-button"
        onClick={() => {
          setKey(key);
        }}
      >
        {key}
      </button>
    );
  });

  return (
    <div style={{ marginTop: "5rem" }}>
      <Title title={"Observations overview"} />
      <div className="histsec">
        <div className="histsec-nav">
          {" "}
          <h4>Measurement type </h4>
          {measTypeButtons}
        </div>
        {table}
      </div>
    </div>
  );
}
