import {DataGrid, GridColumns, GridValidRowModel} from '@mui/x-data-grid';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setPreferredPageSize} from '@yii-dev-panel/sdk/API/Application/ApplicationContext';

type GridProps = {
    rows: GridValidRowModel[];
    columns: GridColumns;
    rowsPerPage?: number[];
    getRowId?: (row: any) => string | number;
    pageSize?: number;
    rowHeight?: number | 'auto';
};

export function DataTable(props: GridProps) {
    const {rows, columns, rowHeight = 'auto', getRowId = (row) => row.id, rowsPerPage = [20, 50, 100]} = props;

    const dispatch = useDispatch();
    // @ts-ignore
    const preferredPageSize = useSelector((state) => state.application.preferredPageSize) as number;

    const [searchParams, setSearchParams] = useSearchParams({page: '0'});
    const [pageSize, setPageSize] = useState(preferredPageSize || Math.min(...rowsPerPage));

    const getRowHeightCallback = useCallback(() => rowHeight, [rowHeight]);

    return (
        <DataGrid
            onCellClick={() => null}
            onCellDoubleClick={() => null}
            onCellFocusOut={() => null}
            onRowClick={() => null}
            onColumnHeaderClick={() => null}
            disableDensitySelector
            disableColumnSelector
            disableVirtualization
            disableSelectionOnClick
            rows={rows}
            getRowId={getRowId}
            columns={columns}
            rowsPerPageOptions={rowsPerPage}
            pageSize={pageSize}
            page={Number(searchParams.get('page'))}
            onPageChange={(page) => {
                setSearchParams({page: String(page)});
            }}
            onPageSizeChange={(value) => {
                setPageSize(value);
                dispatch(setPreferredPageSize(value));
            }}
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
            getRowHeight={getRowHeightCallback}
        />
    );
}
