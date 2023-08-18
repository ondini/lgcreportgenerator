import { Table, Title } from "../../components";

export default function Point3DTable({ pointsData }) {
  return (
    <div>
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
