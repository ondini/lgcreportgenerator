import { Table, Title } from "../../components";

export default function MeasurementsTable({ measStats }) {
  return (
    <div>
      <Title title={"Measurement statistics"} id="measurements" />
      <Table rows={measStats.data} columns={measStats.columnDetails} />
    </div>
  );
}
