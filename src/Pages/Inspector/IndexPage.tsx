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

const rows = [
    { name: 'Snow', value: 'Jon'},
    { name: 'Lannister', value: 'Cersei'},
    { name: 'Lannister', value: 'Jaime'},
    { name: 'Stark', value: 'Arya'},
    { name: 'Targaryen', value: 'Daenerys'},
    { name: 'Melisandre', value: null},
    { name: 'Clifford', value: 'Ferrara'},
    { name: 'Frances', value: 'Rossini'},
    { name: 'Roxie', value: 'Harvey'},
];

export const IndexPage = () => {
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
