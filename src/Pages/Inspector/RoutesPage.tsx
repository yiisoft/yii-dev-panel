import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, GridColDef, GridColumns, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetConfigurationQuery} from "../../API/Inspector/Inspector";

const groupsColumns: GridColDef[] = [
    {
        field: 'prefix', headerName: 'Prefix', width: 150,
        renderCell: (params: GridRenderCellParams) => {
            return <>
                {params.value}
            </>

        }
    },
    {
        field: 'routes', headerName: 'Routes', width: 700,
        renderCell: (params: GridRenderCellParams) => {
            return <>
                {params.value.join(", ")}
            </>

        }
    },
];

const routesColumns: GridColDef[] = [
    {
        field: 'name', headerName: 'Name', width: 150,
        renderCell: (params: GridRenderCellParams) => {
            return <>
                {params.value}
            </>

        }
    },
    {
        field: 'pattern', headerName: 'Pattern', width: 700,
        renderCell: (params: GridRenderCellParams) => {
            return <>
                [{params.row.methods.join('|')}]: {params.value}
            </>

        }
    },
];

function renderGrid(data: any, columns: GridColumns) {
    return <DataGrid
        rows={data as GridValidRowModel[]}
        getRowId={(row) => row.id}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        autoHeight
        getRowHeight={() => 'auto'}
    />;
}

function collectGroupsAndRoutes(data: any, groupPrefix: string, groups: object[], routes: object[]) {
    for (const datum of data) {
        if ('items' in datum) {
            groups.push({
                'id': datum['$__id__$'],
                'prefix': groupPrefix + datum.prefix,
                'routes': datum.items.map((item: any) => item.pattern),
            })
            collectGroupsAndRoutes(datum.items, datum.prefix, groups, routes)
        } else {
            routes.push({
                'id': datum['$__id__$'],
                'name': datum.name,
                'pattern': groupPrefix + datum.pattern,
                'methods': datum.methods ?? [],
            })
        }

    }
}

export const RoutesPage = () => {
    const {data, isLoading, isSuccess} = useGetConfigurationQuery('routes');
    const [routes, setRoutes] = useState<any>([])
    const [groups, setGroups] = useState<any>([])

    console.log(data)
    useEffect(() => {
        if (!isSuccess) {
            return;
        }
        const routes: any = [];
        const groups: any = [];

        collectGroupsAndRoutes(data, '', groups, routes);

        setGroups(groups);
        setRoutes(routes);
    }, [isSuccess])

    if (isLoading) {
        return <>Loading..</>
    }

    return (
        <>
            <h2>{'Routes'}</h2>
            <h3>{'Groups'}</h3>
            {renderGrid(groups, groupsColumns)}
            <h3>{'Routes'}</h3>
            {renderGrid(routes, routesColumns)}
        </>
    );
}
