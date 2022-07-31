import * as React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetConfigurationQuery} from "../../API/Inspector/Inspector";
import ReactJson from "react-json-view";

const columns: GridColDef[] = [
    {
        field: '0', headerName: 'Name', width: 200,
        renderCell: (params: GridRenderCellParams) => <span style={{wordBreak: 'break-all'}}>{params.value}</span>
    },
    {
        field: '1',
        headerName: 'Value',
        width: 1000,
        renderCell: (params: GridRenderCellParams) => {
            if (typeof params.value == 'string') {
                let html = params.value
                    .replaceAll('\n', '<br/>')
                    .replaceAll(' ', '&nbsp')
                ;
                return <div dangerouslySetInnerHTML={{__html: html}}/>
            }
            return <ReactJson src={params.value}/>
        }
    },
];

export const ConfigurationPage = () => {
    const {data, isLoading} = useGetConfigurationQuery('');

    if (isLoading) {
        return <>Loading..</>
    }
    const rows = Object.entries(data!.data as any)

    return (
        <DataGrid
            rows={rows as GridValidRowModel[]}
            getRowId={(row) => row[0]}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight
            getRowHeight={() => 'auto'}
        />
    );
}
