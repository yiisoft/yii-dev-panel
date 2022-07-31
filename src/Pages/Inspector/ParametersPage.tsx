import * as React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetParametersQuery} from "../../API/Inspector/Inspector";
import ReactJson from "react-json-view";

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

export const ParametersPage = () => {
    const {data, isLoading} = useGetParametersQuery('');

    if (isLoading) {
        return <>Loading..</>
    }
    const rows = Object.entries(data!.data as any)

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
