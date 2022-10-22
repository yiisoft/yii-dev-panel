import {DataGrid, GridColumns, GridValidRowModel} from '@mui/x-data-grid';
import * as React from 'react';
import {useState} from 'react';

type GridProps = {
    rows: GridValidRowModel[];
    columns: GridColumns;
    rowsPerPage?: number[];
    getRowId?: (row: any) => string | number;
};

export function DataTable({rows, columns, getRowId = (row) => row.id, rowsPerPage = [20, 50, 100]}: GridProps) {
    const [pageSize, setPageSize] = useState(Math.min(...rowsPerPage));

    return (
        <DataGrid
            rows={rows}
            getRowId={getRowId}
            columns={columns}
            rowsPerPageOptions={rowsPerPage}
            pageSize={pageSize}
            onPageSizeChange={(value) => setPageSize(Math.min(value, 100))}
            disableVirtualization
            rowBuffer={0}
            rowThreshold={0}
            hideFooterSelectedRowCount
            autoHeight
            sx={{
                '& .MuiDataGrid-cell': {
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                },
            }}
            getRowHeight={() => 'auto'}
        />
    );
}
