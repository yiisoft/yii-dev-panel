import * as React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetConfigurationQuery} from "../../API/Inspector/Inspector";
import {JsonRenderer} from "../../Helper/JsonRenderer";

const columns: GridColDef[] = [
    {
        field: '0', headerName: 'Name', width: 200,
        renderCell: (params: GridRenderCellParams) => <span style={{wordBreak: 'break-all'}}>{params.value}</span>
    },
    {
        field: '1',
        headerName: 'Value',
        width: 1000,
        renderCell: (params: GridRenderCellParams) => <JsonRenderer value={params.value}/>
    },
];

export const ConfigurationPage = () => {
    const {data, isLoading} = useGetConfigurationQuery('');

    if (isLoading) {
        return <>Loading..</>
    }
    const rows = Object.entries(data as any)

    return (
        <>
            <h2>{'Configuration'}</h2>
            <DataGrid
                rows={rows as GridValidRowModel[]}
                getRowId={(row) => row[0]}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                getRowHeight={() => 'auto'}
            />
        </>
    );
}
