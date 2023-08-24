import { Table, Title } from "../../components";

export default function MeasurementsTable({ measStats }) {
  return (
    <div>
      <Title title={"Measurement statistics"} id="measurements" />
      {measStats.CC.data.length > 0 && <Table rows={measStats.CC.data} columns={measStats.CC.columnDetails} />}
      {measStats.MM.data.length > 0 && (
        <Table rows={measStats.MM.data} columns={measStats.MM.columnDetails} sx={{ marginTop: "2rem" }} />
      )}
    </div>
  );
}
