import { Table, Title } from "../../components";

export default function FrameTable({ frameData }) {
  return (
    <div>
      <Title title="Frame overview" id="frames" />
      <Table
        getRowId={(row) => {
          return row.NAME;
        }}
        rows={frameData.data}
        columns={frameData.columnDetails}
      />
    </div>
  );
}
