import * as React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useDebugEntry} from "../../Provider/Debug/DebugEntryContext";
import {JsonRenderer} from "../../Helper/JsonRenderer";
import {useGetCollectorInfoQuery} from "../../API/Debug";

const columns: GridColDef[] = [
    {field: '0', headerName: 'Name', width: 130},
    {
        field: '1',
        headerName: 'Value',
        width: 1000,
        renderCell: (params: GridRenderCellParams) => <JsonRenderer value={params.value}/>
    },
];

export const LogPage = () => {
    const debugEntry = useDebugEntry()
    const {data, isLoading} = useGetCollectorInfoQuery({id:debugEntry!.id, collector: 'logger'})

    if (isLoading) {
        return <>Loading..</>
    }

    const rows = Object.entries(data || [] as any)

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows as GridValidRowModel[]}
                getRowId={(row) => row[0]}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                autoHeight
                getRowHeight={() => 'auto'}
            />
        </div>
    );
}
