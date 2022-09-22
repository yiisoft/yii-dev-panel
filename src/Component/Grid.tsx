import {DataGrid, GridColumns, GridValidRowModel} from "@mui/x-data-grid";
import * as React from "react";
import {useState} from "react";

interface GridProps {
    rows: GridValidRowModel[]
    columns: GridColumns
    rowsPerPage?: number[]
    getRowId?: (row: any) => string | number
}

export function DataTable({rows, columns, getRowId = (row) => row.id, rowsPerPage = [20, 50, 100, 1000]}: GridProps) {
    const [pageSize, setPageSize] = useState(Math.min(...rowsPerPage))

    return <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={columns}
        rowsPerPageOptions={rowsPerPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        autoHeight
        sx={{
            '& .MuiDataGrid-cell': {
                alignItems:'flex-start',
                flexDirection: 'column'
            },
        }}
        getRowHeight={() => 'auto'}
    />;
}