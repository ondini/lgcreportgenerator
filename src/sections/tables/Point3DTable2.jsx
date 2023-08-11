import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { get3DPointEstData2 } from "../../data_processing/processing";

const Point3DTable2 = ({ data }) => {
  const pointsData = get3DPointEstData2(data.LGC_DATA);
  const columns = useMemo(() => {
    return pointsData.data;
  }, []);
  return (
    <MaterialReactTable
      columns={pointsData.columnDetails}
      data={columns}
      enableBottomToolbar={false}
      enableColumnFilterModes
      enableRowVirtualization
      enableColumnResizing
      enablePagination={false}
      initialState={{ showColumnFilters: true }}
      muiTableBodyProps={{
        sx: {
          border: "1px solid #eeeeee",
          borderRadius: 5,
        },
      }}
      muiTableHeadProps={{
        sx: {
          border: "1px solid #eeeeee",
          borderRadius: 5,
        },
      }}
      muiBottomToolbarProps={{
        sx: {
          border: "1px solid #eeeeee",
          borderRadius: 5,
        },
      }}
      muiTableProps={{
        sx: {
          tableLayout: "fixed",
          borderRadius: 7,
        },
      }}
      muiTablePaperProps={{ sx: { boxShadow: 0, borderRadius: 5, border: "1px solid #e0e0e0" } }}
    />
  );
};

export default Point3DTable2;
