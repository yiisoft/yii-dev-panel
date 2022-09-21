import * as React from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetParametersQuery} from "../../API/Inspector/Inspector";
import {JsonRenderer} from "../../Helper/JsonRenderer";
import {DataTable} from "../../Component/Grid";

const columns: GridColDef[] = [
    {field: '0', headerName: 'Name', width: 130},
    // { field: 'value', headerName: 'Value', width: 130 },
    {
        field: '1',
        headerName: 'Value',
        width: 1000,
        renderCell: (params: GridRenderCellParams) => <JsonRenderer value={params.value}/>
    },
];

export const ParametersPage = () => {
    const {data, isLoading} = useGetParametersQuery('');

    if (isLoading) {
        return <>Loading..</>
    }
    const rows = Object.entries(data as any)

    return (
        <>
            <h2>{'Parameters'}</h2>
            <div style={{height: 400, width: '100%'}}>
                <DataTable
                    rows={rows as GridValidRowModel[]}
                    getRowId={(row) => row[0]}
                    columns={columns}
                />
            </div>
        </>
    );
}
