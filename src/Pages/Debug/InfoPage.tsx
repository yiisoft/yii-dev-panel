import * as React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import ReactJson from "react-json-view";
import {useGetDebugQuery} from "../../API/Debug";

const columns: GridColDef[] = [
    { field: '0', headerName: 'Name', width: 130 },
    // { field: 'value', headerName: 'Value', width: 130 },
    {
        field: '1',
        headerName: 'Value',
        width: 1000,
        renderCell: (params: GridRenderCellParams) => <ReactJson src={params.value} />
    },
];

export const InfoPage = () => {
    const {data, isLoading} = useGetDebugQuery('');

    if (isLoading) {
        return <>Loading..</>
    }

    const rows = Object.entries(data!.data[0] || [] as any)

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows as GridValidRowModel[]}
                getRowId={(row) => row[0]}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                getRowHeight={() => 'auto'}
            />
        </div>
    );
}
