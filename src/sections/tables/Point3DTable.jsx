import { Table, Title } from "../../components";
import { Box } from "@mui/system";

export default function Point3DTable({ pointsData }) {
  return (
    <div style={{ height: "900px", marginBottom: "4rem" }}>
      <Title title="3D Points overview" id="tablePt3D" />
      <Table
        getRowId={(row) => {
          return row.NAME;
        }}
        rows={pointsData.data}
        columns={pointsData.columnDetails}
      />
    </div>
  );
}
