import {DataGrid, GridColumns, GridValidRowModel} from '@mui/x-data-grid';
import * as React from 'react';
import {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from '../store';
import {setPreferredPageSize} from '../Application/Context/ApplicationContext';

type GridProps = {
    rows: GridValidRowModel[];
    columns: GridColumns;
    rowsPerPage?: number[];
    getRowId?: (row: any) => string | number;
    pageSize?: number;
};

export function DataTable(props: GridProps) {
    const {rows, columns, getRowId = (row) => row.id, rowsPerPage = [20, 50, 100]} = props;

    const dispatch = useDispatch();
    const preferredPageSize = useSelector((state) => state.application.preferredPageSize) as number;

    const [searchParams, setSearchParams] = useSearchParams({page: '0'});
    const [pageSize, setPageSize] = useState(preferredPageSize || Math.min(...rowsPerPage));

    return (
        <DataGrid
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
            getRowHeight={() => 'auto'}
        />
    );
}
