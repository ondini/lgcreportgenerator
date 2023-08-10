import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { get3DPointEstData2 } from "../../data_processing/processing";

const Point3DTable2 = ({ data }) => {
  const pointsData = get3DPointEstData2(data.LGC_DATA);

  return (
    <MaterialReactTable
      columns={pointsData.columnDetails}
      data={pointsData.data}
      enableBottomToolbar={false}
      enableColumnFilterModes
      enableRowVirtualization
      enablePagination={false}
      initialState={{ showColumnFilters: true }}
      muiTableProps={{
        sx: {
          tableLayout: "fixed",
        },
      }}
      muiTablePaperProps={{ sx: { borderRadius: 5, boxShadow: 0, border: "1px solid #e0e0e0" } }}
    />
  );
};

export default Point3DTable2;
