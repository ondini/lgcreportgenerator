import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { get3DPointEstData } from "../../data_processing/processing";
import Title from "../../components/Title";
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
      minHeight: "200px",
      lineHeight: "200px",
    },
    "& .MuiDataGrid-footerContainer": {
      // borderTop: "dashed  1px",
      // borderColor: theme.palette.border.main,
    },
  };
};

export default function Point3DTable({ data }) {
  const pointsData = get3DPointEstData(data.LGC_DATA);

  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
      <Title title="3D Points overview" id="tablePt3D" />
      <Box sx={generateTableStyle()}>
        <DataGrid
          rows={pointsData.data}
          columns={pointsData.columnDetails}
          hideFooter
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          headerHeight={60}
        />
      </Box>
    </div>
  );
}
